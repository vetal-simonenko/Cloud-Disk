import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TFile } from '../libs/definitions';

type FileState = {
	files: TFile[];
	currentDir: string;
	dirStack: string[];
};

const initialState: FileState = {
	files: [],
	currentDir: '',
	dirStack: [],
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
		addFile: (state, action: PayloadAction<TFile>) => {
			state.files.push(action.payload);
		},
		pushToStack: (state, action: PayloadAction<string>) => {
			state.dirStack.push(action.payload);
		},
		popFromStack: (state) => {
			state.currentDir = state.dirStack.pop() as string;
		},
	},
});

export const { setFiles, setCurrentDir, addFile, pushToStack, popFromStack } =
	fileSlice.actions;

export default fileSlice.reducer;
