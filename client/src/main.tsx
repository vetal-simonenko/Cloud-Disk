import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import { store } from './reducers/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</React.StrictMode>
	</Provider>
);
