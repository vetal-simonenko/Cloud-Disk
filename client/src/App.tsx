import { Box, Container } from '@mui/material';
import ResponsiveAppBar from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import { useEffect, useState } from 'react';
import { auth } from './actions/user';
import { useAppDispatch, useAppSelector } from './reducers/hooks';
import Disk from './components/disk/Disk';

const App = () => {
	const [loader, setLoader] = useState(true);
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(auth()).finally(() => {
			setLoader(false);
		});
	}, [dispatch]);

	if (loader) {
		return;
	}

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
							{!isAuth ? (
								<>
									<Route
										path='/registration'
										element={<Registration />}
									/>
									<Route path='/login' element={<Login />} />
									<Route path='*' element={<Login />} />
								</>
							) : (
								<>
									<Route index path='/' element={<Disk />} />
									<Route path='*' element={<Disk />} />
								</>
							)}
						</Routes>
					</Container>
				</Box>
				<Footer />
			</Box>
		</BrowserRouter>
	);
};

export default App;
