import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRouter);

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
