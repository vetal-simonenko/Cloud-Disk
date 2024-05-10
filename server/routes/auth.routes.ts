import express from 'express';
import { check } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware';
import UserController from '../controllers/userController';

const authRouter = express.Router();

authRouter.post(
	'/registration',
	[
		check('email', 'Invalid email address').isEmail(),
		check(
			'password',
			'Password must be longer than 3 and shorter than 12'
		).isLength({ min: 3, max: 12 }),
	],
	UserController.register
);

authRouter.post(
	'/login',
	[
		check('email', 'Invalid email address').isEmail(),
		check(
			'password',
			'Password must be longer than 3 and shorter than 12'
		).isLength({ min: 3, max: 12 }),
	],
	UserController.login
);

authRouter.get('/auth', authMiddleware, UserController.auth);

export default authRouter;
