import { Typography, Link } from '@mui/material';

const Copyright = () => {
	return (
		<Typography
			variant='body1'
			color='text.secondary'
			textAlign='center'
		>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://www.linkedin.com/in/vetaldev/'
			>
				Contact Me - Linkedin
			</Link>{' '}
			{new Date().getFullYear()}.
		</Typography>
	);
};

export default Copyright;
