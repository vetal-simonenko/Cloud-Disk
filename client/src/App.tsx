import { Box, Container } from '@mui/material';
import ResponsiveAppBar from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers/store';
import { useEffect } from 'react';
import { auth } from './actions/user';

const App = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	}, [dispatch]);

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
						{!isAuth ? (
							<Routes>
								<Route
									path='/registration'
									element={<Registration />}
								/>
								<Route path='/login' element={<Login />} />
								{/* <Route path='*' element={<Login />} /> */}
							</Routes>
						) : (
							<Routes>
								<Route path='/' element={<p>List</p>} />
								{/* <Route path='*' element={<p>List</p>} /> */}
							</Routes>
						)}
					</Container>
				</Box>
				<Footer />
			</Box>
		</BrowserRouter>
	);
};

export default App;
