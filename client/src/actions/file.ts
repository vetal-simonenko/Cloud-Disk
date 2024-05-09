import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { addFile, deleteFileAction, setFiles } from '../reducers/fileReducer';
import { TFile } from '../libs/definitions';
import {
	addUploadFile,
	changeUploadFile,
	showUploader,
} from '../reducers/uploadReducer';
import { hideLoader, showLoader } from '../reducers/appReducer';

export const getFiles = (dirId: string, sort: string | null) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(showLoader());
			let url = 'http://localhost:5000/api/files';
			if (dirId || sort) {
				url += '?';
				if (dirId) {
					url += `parent=${dirId}`;
					if (sort) {
						url += `&sort=${sort}`;
					}
				} else if (sort) {
					url += `sort=${sort}`;
				}
			}

			const token = localStorage.getItem('token');
			const headers = token ? { Authorization: `Bearer ${token}` } : {};

			const response = await axios.get(url, { headers });

			dispatch(setFiles(response.data));
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			} else {
				console.log('An error occurred:' + (error as Error).message);
			}
		} finally {
			dispatch(hideLoader());
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
				formData.append('parent', dirId);
			}

			const uploadFile = {
				id: `${Date.now()}`,
				name: file.name,
				progress: 0,
			};

			dispatch(showUploader());
			dispatch(addUploadFile(uploadFile));

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
							uploadFile.progress = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.event.total
							);
							console.log(`Progress: ${uploadFile.progress}%`);
							dispatch(changeUploadFile(uploadFile));
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

export const deleteFile = (file: TFile) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await axios.delete(
				`http://localhost:5000/api/files?id=${file._id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			);
			dispatch(deleteFileAction(file._id));
			console.log(response.data.message);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			} else {
				console.log('An error occurred:' + (error as Error).message);
			}
		}
	};
};

export const searchFiles = (search: string) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(showLoader());
			const response = await axios.get(
				`http://localhost:5000/api/files/search?search=${search.toLowerCase()}`,
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
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data.message);
			} else {
				console.log('An error occurred:' + (error as Error).message);
			}
		} finally {
			dispatch(hideLoader());
		}
	};
};
