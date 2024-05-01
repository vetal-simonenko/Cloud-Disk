import { Box, Container } from '@mui/material';
import ResponsiveAppBar from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/Registration';

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
						<Routes>
							<Route
								path='/registration'
								element={<Registration />}
							/>
							<Route
								path='/login'
								element={<p>sign in</p>}
							/>
						</Routes>
					</Container>
				</Box>
				<Footer />
			</Box>
		</BrowserRouter>
	);
};

export default App;
