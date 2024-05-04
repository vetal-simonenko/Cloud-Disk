import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { setFiles } from '../reducers/fileReducer';

const getFiles = (dirId: string) => {
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
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
};

export default getFiles;
