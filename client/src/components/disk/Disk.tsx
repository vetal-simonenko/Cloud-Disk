import { Box, Button, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { useEffect } from 'react';
import getFiles from '../../actions/file';
import FileList from './fileList/FileList';

const Disk = () => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);

	return (
		<Box maxWidth='md' marginInline='auto'>
			<Typography
				variant='h5'
				component='h1'
				sx={{ mb: 3, textAlign: 'center' }}
			>
				Your Files
			</Typography>
			<Grid container sx={{ mb: 3 }}>
				<Grid item xs={6} sx={{ display: 'flex' }}>
					<Button
						sx={{ mr: 2 }}
						color='primary'
						size='large'
						variant='outlined'
					>
						Back
					</Button>
					<Button color='primary' size='large' variant='outlined'>
						Create Folder
					</Button>
				</Grid>
				<Grid
					item
					xs={6}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					Sort
				</Grid>
			</Grid>

			<FileList />
		</Box>
	);
};

export default Disk;
