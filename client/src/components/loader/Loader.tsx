import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
	return (
		<Box
			sx={{
				minHeight: '80vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loader;
