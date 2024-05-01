import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: {},
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		incrementByAmount: (state) => {
			state;
		},
	},
});

export const { incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
