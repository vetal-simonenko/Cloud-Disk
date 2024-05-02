import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: {},
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<object>) => {
			state.currentUser = action.payload;
			state.isAuth = true;
		},
		logoutUser: (state) => {
			localStorage.removeItem('token');
			state.currentUser = {};
			state.isAuth = false;
		},
	},
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
