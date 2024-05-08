import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import FileController from '../controllers/fileController';

const fileRouter = express.Router();

fileRouter.post('', authMiddleware, FileController.createDir);
fileRouter.post('/upload', authMiddleware, FileController.uploadFile);
fileRouter.get('', authMiddleware, FileController.getFiles);
fileRouter.get('/download', authMiddleware, FileController.downloadFile);
fileRouter.delete('/', authMiddleware, FileController.deleteFile);

export default fileRouter;
