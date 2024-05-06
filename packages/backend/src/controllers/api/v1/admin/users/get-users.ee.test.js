import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../../../../app';
import createAuthTokenByUserId from '../../../../../helpers/create-auth-token-by-user-id';
import { createRole } from '../../../../../../test/factories/role';
import { createUser } from '../../../../../../test/factories/user';
import { getUsersMock } from '../../../../../../test/mocks/rest/api/v1/admin/users/get-users.js';
import * as license from '../../../../../helpers/license.ee.js';

let currentUser, currentUserRole, anotherUser, anotherUserRole, token;

vi.mock('../../../../../helpers/license.ee.js', async () => {
  const originalModule = await vi.importActual('../../../../../helpers/license.ee.js');
  return {
    ...originalModule,
    hasValidLicense: vi.fn().mockResolvedValue(true),
  };
});

describe('GET /api/v1/admin/users', () => {
  beforeEach(async () => {
    currentUserRole = await createRole({ key: 'admin' });

    currentUser = await createUser({
      roleId: currentUserRole.id,
      fullName: 'Current User',
    });

    anotherUserRole = await createRole({
      key: 'anotherUser',
      name: 'Another user role',
    });

    anotherUser = await createUser({
      roleId: anotherUserRole.id,
      fullName: 'Another User',
    });

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return users data', async () => {
    const response = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', token)
      .expect(200);

    const expectedResponsePayload = await getUsersMock(currentUser, anotherUser, currentUserRole, anotherUserRole);

    expect(response.body).toEqual(expectedResponsePayload);
  });
});

