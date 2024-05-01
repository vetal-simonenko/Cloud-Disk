import { Box, Container } from '@mui/material';
import Copyright from './Copyright';

const Footer = () => {
	return (
		<Box component='footer' sx={{ py: 3 }}>
			<Container maxWidth='lg'>
				<Copyright />
			</Container>
		</Box>
	);
};

export default Footer;
