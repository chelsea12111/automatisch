import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import Crypto from 'crypto';
import app from '../../../../app.js';
import createAuthTokenByUserId from '../../../../helpers/create-auth-token-by-user-id';
import { createUser, createFlow, createStep, createExecution, createExecutionStep } from '../../../../../test/factories';
import { createPermission, validatePermission } from '../../../../../test/factories/permission';
import getExecutionStepsMock from '../../../../../test/mocks/rest/api/v1/executions/get-execution-steps';

describe('GET /api/v1/executions/:executionId/execution-steps', () => {
  let currentUser, token;
  let currentUserFlow, stepOne, stepTwo, currentUserExecution, currentUserExecutionStepOne, currentUserExecutionStepTwo;
  let anotherUser, anotherUserFlow, anotherUserExecution, anotherUserExecutionStepOne, anotherUserExecutionStepTwo;

  beforeEach(async () => {
    currentUser = await createUser();
    token = await createAuthTokenByUserId(currentUser.id).catch(error => console.error(error));

    currentUserFlow = await createFlow({ userId: currentUser.id });
    stepOne = await createStep({ flowId: currentUserFlow.id, type: 'trigger' });
    stepTwo = await createStep({ flowId: currentUserFlow.id, type: 'action' });

    currentUserExecution = await createExecution({ flowId: currentUserFlow.id });
    currentUserExecutionStepOne = await createExecutionStep({ executionId: currentUserExecution.id, stepId: stepOne.id });
    currentUserExecutionStepTwo = await createExecutionStep({ executionId: currentUserExecution.id, stepId: stepTwo.id });

    anotherUser = await createUser();
    anotherUserFlow = await createFlow({ userId: anotherUser.id });
    anotherUserExecution = await createExecution({ flowId: anotherUserFlow.id });
    anotherUserExecutionStepOne = await createExecutionStep({ executionId: anotherUserExecution.id, stepId: stepOne.id });
    anotherUserExecutionStepTwo = await createExecutionStep({ executionId: anotherUserExecution.id, stepId: stepTwo.id });

    await createPermission({
      action: 'read',
      subject: 'Execution',
      roleId: currentUser.roleId,
      conditions: ['isCreator'],
    }).catch(error => console.error(error));

    await validatePermission({
      action: 'read',
      subject: 'Execution',
      roleId: currentUser.roleId,
      conditions: [],
    }).catch(error => console.error(error));

    await getExecutionStepsMock([currentUserExecutionStepOne, currentUserExecutionStepTwo], [stepOne, stepTwo]).catch(error => console.error(error));
  });

  const setup = async (executionId) => {
    await request(app)
      .get(`/api/v1/executions/${executionId}/execution-steps`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);
  };

  it('should return the execution steps of current user execution', async () => {
    await setup(currentUserExecution.id);
  });

  it('should return the execution steps of another user execution', async () => {
    await setup(anotherUserExecution.id);
  });

  it('should return not found response for not existing execution step UUID', async () => {
    const notExistingExcecutionUUID = Crypto.randomUUID();

    await request(app)
      .get(`/api/v1/executions/${notExistingExcecutionUUID}/execution-steps`)
      .set('Authorization', token)
      .expect(404);
  });

  it('should return bad request response for invalid UUID', async () => {
    await request(app)
      .get('/api/v1/executions/invalidExecutionUUID/execution-steps')
      .set('Authorization', token)
      .expect(400);
  });

  it('should return unauthorized response for unauthorized user', async () => {
    const unauthorizedUser = await createUser();
    const unauthorizedToken = await createAuthTokenByUserId(unauthorizedUser.id).catch(error => console.error(error));

    await request(app)
      .get(`/api/v1/executions/${currentUserExecution.id}/execution-steps`)
      .set('Authorization', unauthorizedToken)
      .expect(401);
  });

  it('should return forbidden response for unauthorized user with no read permission', async () => {
    await createPermission({
      action: 'read',
      subject: 'Execution',
      roleId: currentUser.roleId,
      conditions: [],
    }).catch(error => console.error(error));

    await request(app)
      .get(`/api/v1/executions/${currentUserExecution.id}/execution-steps`)
      .set('Authorization', token)
      .expect(403);
  });

  it('should return bad request response for invalid executionId parameter', async () => {
    await request(app)
      .get('/api/v1/executions/invalidExecutionId/execution-steps')
      .set('Authorization', token)
      .expect(400);
  });

  it('should return not found response for non-existing executionId parameter', async () => {
    const nonExistingExecutionId = Crypto.randomUUID();

    await request(app)
      .get(`/api/v1/executions/${nonExistingExecutionId}/execution-steps`)
      .set('Authorization', token)
      .expect(404);
  });
});
