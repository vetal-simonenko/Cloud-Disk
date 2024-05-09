import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loader: false,
};

export const fileSlice = createSlice({
	name: 'File',
	initialState,
	reducers: {
		showLoader: (state) => {
			state.loader = true;
		},
		hideLoader: (state) => {
			state.loader = false;
		},
	},
});

export const { showLoader, hideLoader } = fileSlice.actions;

export default fileSlice.reducer;
