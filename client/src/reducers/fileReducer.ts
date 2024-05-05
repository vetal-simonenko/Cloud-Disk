import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type FileState = {
	files: object[];
	currentDir: string;
};

const initialState: FileState = {
	files: [],
	currentDir: '',
};

export const fileSlice = createSlice({
	name: 'File',
	initialState,
	reducers: {
		setFiles: (state, action: PayloadAction<[]>) => {
			state.files = action.payload;
		},
		setCurrentDir: (state, action: PayloadAction<string>) => {
			state.currentDir = action.payload;
		},
		addFile: (state, action: PayloadAction<object>) => {
			state.files.push(action.payload);
		},
	},
});

export const { setFiles, setCurrentDir, addFile } = fileSlice.actions;

export default fileSlice.reducer;
