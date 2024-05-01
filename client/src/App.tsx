import { Box, Typography, Container } from '@mui/material';
import ResponsiveAppBar from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Box
				component='div'
				id='wrapper'
				sx={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<ResponsiveAppBar />
				<Box component='main' sx={{ flexGrow: 1, py: 4 }}>
					<Container maxWidth='lg'>
						<Typography
							variant='h4'
							component='h1'
							sx={{ mb: 2 }}
						>
							Mern cloud disk
						</Typography>
					</Container>
				</Box>
				<Footer />
			</Box>
		</BrowserRouter>
	);
};

export default App;
