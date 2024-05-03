import fs from 'fs';

class FileService {
	createDir(file: any) {
		console.log(file);

		const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;

		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: 'Folder was created' });
				} else {
					return reject({ message: 'Folder alredy exist' });
				}
			} catch (error) {
				return reject({ message: "Folder wasn't created" });
			}
		});
	}
}

export default new FileService();
