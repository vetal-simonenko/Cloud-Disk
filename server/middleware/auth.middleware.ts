import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend express Request interface to include user property
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Token not found.' });
		}

		const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

		// Assign decoded token to req.user
		req.user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth error' });
	}
};
