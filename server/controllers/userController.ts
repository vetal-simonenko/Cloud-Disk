import { Request, Response } from 'express';
import User from '../models/User';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import fileService from '../services/fileService';
import File from '../models/File';
import jwt from 'jsonwebtoken';

class UserController {
	async register(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg });
			}

			const { email, password } = req.body;
			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({
					message: `User with email ${email} already exist!`,
				});
			}

			const hashPassword = await bcrypt.hash(password, 8);
			const user = new User({ email, password: hashPassword });
			await user.save();

			await fileService.createDir(new File({ userId: user.id }));
			return res.json({ message: 'User was created!' });
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server error' });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg });
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json({
					message: `User with email ${email} not found!`,
				});
			}

			const isPassValid = bcrypt.compareSync(
				password,
				user.password as string
			);

			if (!isPassValid) {
				return res.status(400).json({
					message: `Password for user ${email} not correct!`,
				});
			}

			const token = jwt.sign(
				{ id: user.id },
				`${process.env.JWT_SECRET_KEY}`,
				{
					expiresIn: '1h',
				}
			);

			res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					usedSpace: user.usedSpace,
					avatar: user.avatar,
				},
			});
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server error' });
		}
	}

	async auth(req: Request, res: Response) {
		try {
			const user = await User.findOne({ _id: req.user.id });

			const token = jwt.sign(
				{ id: user?.id },
				`${process.env.JWT_SECRET_KEY}`,
				{
					expiresIn: '1h',
				}
			);

			res.json({
				token,
				user: {
					id: user?.id,
					email: user?.email,
					diskSpace: user?.diskSpace,
					usedSpace: user?.usedSpace,
					avatar: user?.avatar,
				},
			});
		} catch (error) {
			console.log(error);
			res.send({ message: 'Server error' });
		}
	}
}
export default new UserController();
