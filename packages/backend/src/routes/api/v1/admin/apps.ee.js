import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateUser, authorizeAdmin, checkIsEnterprise } from '../../../../helpers/authentication.js';
import getAuthClientsAction from '../../../../controllers/api/v1/admin/apps/get-auth-clients.ee.js';
import getAuthClientAction from '../../../../controllers/api/v1/admin/apps/get-auth-client.ee.js';

const router = Router();

// Middleware function to reuse authentication and authorization checks
const authCheck = [authenticateUser, authorizeAdmin, checkIsEnterprise];

router.get(
  '/:appKey/auth-clients',
  ...authCheck,
  asyncHandler(getAuthClientsAction)
);

router.get(
  '/:appKey/auth-clients/:appAuthClientId',
  ...authCheck,
  asyncHandler(getAuthClientAction)
);

export default router;
