import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import 'dotenv/config';
import { corsMiddleware } from './middleware/cors.middleware';
import fileRouter from './routes/file.routes';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = process.env.PORT;

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
	try {
		await mongoose.connect(`${process.env.DBURL}`).then(
			() => {
				console.log('MongoDB ready to use');
			},
			(err) => {
				console.log(err);
			}
		);
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
