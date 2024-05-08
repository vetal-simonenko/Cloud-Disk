import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { addFile, setFiles } from '../reducers/fileReducer';
import { TFile } from '../libs/definitions';

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

export const uploadFile = (file: File, dirId: string) => {
	return async (dispatch: Dispatch) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			if (dirId) {
				formData.append('parentId', dirId);
			}

			const response = await axios.post(
				`http://localhost:5000/api/files/upload`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
					onUploadProgress: (progressEvent) => {
						/* eslint-disable no-mixed-spaces-and-tabs */
						const totalLength = progressEvent.event.lengthComputable
							? progressEvent.event.total
							: progressEvent.event.target.getResponseHeader(
									'content-length'
							  ) ||
							  progressEvent.event.target.getResponseHeader(
									'x-decompressed-content-length'
							  );
						console.log('total ', totalLength);
						if (progressEvent.event.lengthComputable) {
							const progress = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.event.total
							);
							console.log(`Progress: ${progress}%`);
						}
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

export const downloadFile = async (file: TFile) => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/files/download?id=${file._id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);

		if (response.status === 200) {
			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.download = file.name;
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data.message);
		} else {
			console.log('An error occurred:' + (error as Error).message);
		}
	}
};
