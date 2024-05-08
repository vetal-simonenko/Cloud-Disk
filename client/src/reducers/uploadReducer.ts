import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UploadItem = {
	id: string;
	name: string;
	progress: number;
};

type UploadState = {
	files: UploadItem[];
	isVisible: boolean;
};

const initialState: UploadState = {
	files: [],
	isVisible: false,
};

export const uploadSlice = createSlice({
	name: 'UploadFile',
	initialState,
	reducers: {
		showUploader: (state) => {
			state.isVisible = true;
		},
		hideUploader: (state) => {
			state.isVisible = false;
			state.files = [];
		},
		addUploadFile: (state, action: PayloadAction<UploadItem>) => {
			state.files = [
				...state.files,
				{
					...action.payload,
				},
			];
		},
		removeUploadFile: (state, action: PayloadAction<string>) => {
			state.files = state.files.filter(
				(file) => file.id !== action.payload
			);
		},
		changeUploadFile: (state, action: PayloadAction<UploadItem>) => {
			state.files = state.files.map((file) => {
				if (file.id === action.payload.id) {
					return { ...file, progress: action.payload.progress };
				} else {
					return { ...file };
				}
			});
		},
	},
});

export const {
	showUploader,
	hideUploader,
	addUploadFile,
	removeUploadFile,
	changeUploadFile,
} = uploadSlice.actions;

export default uploadSlice.reducer;
