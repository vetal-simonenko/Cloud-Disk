import axios from 'axios';
import { useState } from 'react';

export const useRegister = () => {
	const [message, setMessage] = useState({
		msg: '',
		err: false,
	});
	const [loader, setLoader] = useState(false);

	const registrationFn = async (email: string, password: string) => {
		setLoader(true);
		try {
			const response = await axios.post(
				'http://localhost:5000/api/auth/registration',
				{
					email,
					password,
				}
			);
			setMessage({ msg: response.data.message, err: false });
			setLoader(false);
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
