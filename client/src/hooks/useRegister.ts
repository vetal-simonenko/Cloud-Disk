import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
	const [message, setMessage] = useState({
		msg: '',
		err: false,
	});
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const registrationFn = async (email: string, password: string) => {
		setLoader(true);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/auth/registration`,
				{
					email,
					password,
				}
			);
			setMessage({ msg: response.data.message, err: false });
			setLoader(false);
			setTimeout(() => {
				navigate('/');
			}, 1000);
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
		registrationFn,
	};
};
