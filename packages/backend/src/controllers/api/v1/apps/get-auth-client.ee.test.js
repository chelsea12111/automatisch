import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import Crypto from 'crypto';
import app from '../../../../app.js';
import createAuthTokenByUserId from '../../../../helpers/create-auth-token-by-user-id.js';
import { createUser, cleanupUsers } from '../../../../../test/factories/user.js';
import getAppAuthClientMock from '../../../../../test/mocks/rest/api/v1/apps/get-auth-client.js';
import { createAppAuthClient } from '../../../../../test/factories/app-auth-client.js';
import * as license from '../../../../helpers/license.ee.js';

let currentUser, currentAppAuthClient, token, hasValidLicenseMock;

const teardown = () => {
  hasValidLicenseMock.mockReset();
};

const afterEachTest = async () => {
  await cleanupUsers();
  currentUser = null;
  currentAppAuthClient = null;
  token = null;
};

describe('GET /api/v1/apps/:appKey/auth-clients/:appAuthClientId', () => {
  beforeAll(() => {
    hasValidLicenseMock = vi.spyOn(license, 'hasValidLicense').mockResolvedValue(true);
  });

  afterEach(() => {
    teardown();
    afterEachTest();
  });

  describe('when license is valid', () => {
    beforeEach(async () => {
      currentUser = await createUser();
      currentAppAuthClient = await createAppAuthClient({
        appKey: 'deepl',
      });

      token = await createAuthTokenByUserId(currentUser.id);
    });

    it('should return specified app auth client', async () => {
      const response = await request(app)
        .get(`/api/v1/apps/deepl/auth-clients/${currentAppAuthClient.id}`)
        .set('Authorization', token)
        .expect(200);

      const expectedPayload = getAppAuthClientMock(currentAppAuthClient);
      expect(response.body).toEqual(expectedPayload);
    });

    it('should return not found response for not existing app auth client ID', async () => {
      const notExistingAppAuthClientUUID = Crypto.randomUUID();

      await request(app)
        .get(`/api/v1/apps/deepl/auth-clients/${notExistingAppAuthClientUUID}`)
        .set('Authorization', token)
        .expect(404);
    });

    it('should return bad request response for invalid UUID', async () => {
      await request(app)
        .get('/api/v1/apps/deepl/auth-clients/invalidAppAuthClientUUID')
        .set('Authorization', token)
        .expect(400);
    });
  });

  describe('when license is not valid', () => {
    beforeEach(() => {
      hasValidLicenseMock.mockResolvedValue(false);
    });

    it('should return unauthorized response', async () => {
      await request(app)
        .get('/api/v1/apps/deepl/auth-clients/validAppAuthClientUUID')
        .set('Authorization', token)
        .expect(401);
    });
  });
});
