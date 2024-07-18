import express from 'express';
const router = express.Router();
import AuthController from '../controllers/AuthController.js';

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

export default router;
