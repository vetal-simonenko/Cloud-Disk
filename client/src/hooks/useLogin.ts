import axios from 'axios';
import { useState } from 'react';
import { setUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../reducers/hooks';

export const useLogin = () => {
	const [message, setMessage] = useState({
		msg: '',
		err: false,
	});
	const [loader, setLoader] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loginFn = async (email: string, password: string) => {
		setLoader(true);
		try {
			const response = await axios.post(
				'http://localhost:5000/api/auth/login',
				{
					email,
					password,
				}
			);
			dispatch(setUser(response.data.user));
			localStorage.setItem('token', response.data.token);

			setMessage({ msg: 'Login successful!', err: false });
			setLoader(false);
			navigate('/');
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setMessage({
					msg: error.response?.data?.message || 'An error occurred',
					err: true,
				});
			} else {
				setMessage({
					msg: 'An error occurred:' + (error as Error).message,
					err: true,
				});
			}
			setLoader(false);
		}
	};

	return {
		loader,
		message,
		loginFn,
	};
};
