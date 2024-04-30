import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

const app = express();
const PORT = config.get('serverPort');

const start = async () => {
	try {
		await mongoose.connect(config.get('dbUrl'));
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
