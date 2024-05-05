import fs from 'fs';

class FileService {
	createDir(file: any) {
		const filePath = `${process.env.FILE_PATH}\\${file.userId}\\${file.path}`;

		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: 'Folder was created' });
				} else {
					return reject({
						message: 'Folder with current name alredy exist',
					});
				}
			} catch (error) {
				return reject({ message: "Folder wasn't created" });
			}
		});
	}
}

export default new FileService();
