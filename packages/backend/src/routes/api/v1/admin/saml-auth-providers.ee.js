import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateUser, authorizeAdmin, checkIsEnterprise } from '../../../../helpers/index.js';
import * as samlAuthProvidersController from '../../../../controllers/api/v1/admin/saml-auth-providers/index.ee.js';

const router = Router();

const authMiddleware = [authenticateUser, authorizeAdmin, checkIsEnterprise];

router.get('/', ...authMiddleware, asyncHandler(samlAuthProvidersController.getSamlAuthProviders));
router.get('/:samlAuthProviderId', ...authMiddleware, asyncHandler(samlAuthProvidersController.getSamlAuthProvider));
router.get('/:samlAuthProviderId/role-mappings', ...authMiddleware, asyncHandler(samlAuthProvidersController.getRoleMappings));

export default router;

