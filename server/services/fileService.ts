import fs from 'fs';
import path from 'path';

class FileService {
	createDir(file: any) {
		const filePath = this.getPath(file);

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

	deleteFile(file: any) {
		const path = this.getPath(file);
		if (file.type === 'dir') {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	}

	getPath(file: any) {
		return path.join(
			`${process.env.FILE_PATH}`,
			`${file.userId}`,
			`${file.path}`
		);
	}
}

export default new FileService();
