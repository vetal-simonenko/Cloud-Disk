import { setUser } from '../reducers/userReducer';
import axios from 'axios';
import { Dispatch } from 'redux';

export const auth = () => {
	return async (dispatch: Dispatch) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				return;
			}

			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/auth/auth`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(setUser(response.data.user));
			localStorage.setItem('token', response.data.token);
		} catch (error) {
			localStorage.removeItem('token');
		}
	};
};

export const uploadAvatar = (file: File) => {
	return async (dispatch: Dispatch) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const token = localStorage.getItem('token');
			if (!token) {
				return;
			}

			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/files/avatar`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(setUser(response.data));
		} catch (error) {
			localStorage.removeItem('token');
		}
	};
};

export const deleteAvatar = () => {
	return async (dispatch: Dispatch) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				return;
			}

			const response = await axios.delete(
				`${import.meta.env.VITE_API_URL}/api/files/avatar`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(setUser(response.data));
		} catch (error) {
			localStorage.removeItem('token');
		}
	};
};
