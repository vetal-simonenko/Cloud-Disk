import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { message, registrationFn } = useRegister();

	const formMessage = !!message.msg && (
		<Alert
			sx={{
				mb: 2,
			}}
			severity={message.err ? 'error' : 'success'}
		>
			{message.msg}
		</Alert>
	);

	return (
		<Box maxWidth='400px' marginInline='auto'>
			<Typography variant='h5' component='h1' sx={{ mb: 2 }}>
				Registration
			</Typography>
			<TextField
				id='email'
				label='Email'
				variant='outlined'
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				sx={{
					width: '100%',
					mb: 4,
				}}
			/>
			<TextField
				id='Password'
				label='Password'
				variant='outlined'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				sx={{
					width: '100%',
					mb: 2,
				}}
			/>
			{formMessage}
			<Button
				color='primary'
				size='large'
				variant='outlined'
				onClick={() => {
					registrationFn(email, password);
				}}
			>
				Submit
			</Button>
		</Box>
	);
};

export default Registration;
