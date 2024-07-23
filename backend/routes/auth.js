import express from 'express';
import { createUserSchema } from '../schemas/userSchema.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();
import AuthController from '../controllers/AuthController.js';

router.post(
  '/register',
  validateRequest(createUserSchema),
  AuthController.register
);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

export default router;
