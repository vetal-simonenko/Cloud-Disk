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
				'http://localhost:5000/api/auth/auth',
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
				'http://localhost:5000/api/files/avatar',
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
				'http://localhost:5000/api/files/avatar',
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
