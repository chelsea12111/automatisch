import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateUser, authorizeUser } from '../../../helpers/auth.js';
import * as executionController from '../../../controllers/api/v1/executions.js';

const router = Router();

const {
  getExecutionsAction,
  getExecutionAction,
  getExecutionStepsAction,
} = executionController;

const authMiddleware = [authenticateUser, authorizeUser];

router.get('/', authMiddleware, asyncHandler(getExecutionsAction));
router.get('/:executionId', authMiddleware, asyncHandler(getExecutionAction));
router.get(
  '/:executionId/execution-steps',
  authMiddleware,
  asyncHandler(getExecutionStepsAction)
);

export default router;

