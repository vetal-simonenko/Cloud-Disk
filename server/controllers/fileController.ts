import fileService from '../services/fileService';
import File from '../models/File';
import { Request, Response } from 'express';

// Extend express Request interface to include user property
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

class FileController {
	async createDir(req: Request, res: Response) {
		try {
			const { name, type, parentId } = req.body;
			const file = new File({
				name,
				type,
				parentId,
				userId: req.user.id,
			});
			const parentFile = await File.findOne({ _id: parentId });

			if (!parentFile) {
				file.path = name;
				await fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}\\${file.name}`;
				await fileService.createDir(file);

				parentFile.childIds.push(file._id);
				await parentFile.save();
			}

			await file.save();
			return res.json(file);
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	}

	async getFiles(req: Request, res: Response) {
		try {
			const files = await File.find({
				userId: req.user.id,
				parentId: req.query.parent,
			});

			return res.json(files);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Can not get files' });
		}
	}
}

export default new FileController();
