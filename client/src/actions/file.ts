import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { addFile, setFiles } from '../reducers/fileReducer';

export const getFiles = (dirId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/files${
					dirId ? `?parent=${dirId}` : ``
				}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			);

			dispatch(setFiles(response.data));
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			} else {
				console.log('An error occurred:' + (error as Error).message);
			}
		}
	};
};

export const createDir = (dirId: string, name: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/files`,
				{
					name,
					parentId: dirId ? dirId : null,
					type: 'dir',
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			);

			dispatch(addFile(response.data));
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			} else {
				console.log('An error occurred:' + (error as Error).message);
			}
		}
	};
};
