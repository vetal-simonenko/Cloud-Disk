import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

export const fileSlice = createSlice({
	name: 'File',
	initialState,
	reducers: {
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { incrementByAmount } = fileSlice.actions;

export default fileSlice.reducer;
