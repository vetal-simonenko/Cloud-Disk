import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
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
	},
});

export const { setFiles, setCurrentDir } = fileSlice.actions;

export default fileSlice.reducer;
