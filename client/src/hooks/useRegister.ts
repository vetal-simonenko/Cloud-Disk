import axios from 'axios';
import { useState } from 'react';

export const useRegister = () => {
	const [message, setMessage] = useState({
		msg: '',
		err: false,
	});

	const registrationFn = async (email: string, password: string) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/api/auth/registration',
				{
					email,
					password,
				}
			);
			setMessage({ msg: response.data.message, err: false });
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
		}
	};

	return {
		message,
		registrationFn,
	};
};
