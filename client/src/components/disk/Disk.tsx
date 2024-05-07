import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { useEffect, useRef, useState } from 'react';
import { createDir, getFiles, uploadFile } from '../../actions/file';
import FileList from './fileList/FileList';
import { popFromStack } from '../../reducers/fileReducer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const Disk = () => {
	const [open, setOpen] = useState(false);
	const textRef = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);

	const handleTogglePopup = () => {
		setOpen((open) => !open);
		setTimeout(() => {
			if (!open) {
				textRef.current?.focus();
			}
		}, 0);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson: { [key: string]: string } = {};
		formData.forEach((value, key) => {
			formJson[key] = value.toString();
		});
		dispatch(createDir(currentDir, formJson.name));
		handleTogglePopup();
	};

	const backClickHandler = () => {
		dispatch(popFromStack());
	};

	const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			[...files].forEach((file) =>
				dispatch(uploadFile(file, currentDir))
			);
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={handleTogglePopup}
				PaperProps={{
					component: 'form',
					onSubmit: handleFormSubmit,
				}}
			>
				<DialogTitle>Create new folder</DialogTitle>
				<DialogContent>
					<TextField
						inputRef={textRef}
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Folder name'
						type='text'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleTogglePopup}>Cancel</Button>
					<Button type='submit'>Create</Button>
				</DialogActions>
			</Dialog>

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
						{currentDir && (
							<Button
								onClick={backClickHandler}
								sx={{ mr: 2 }}
								color='primary'
								size='large'
								variant='outlined'
							>
								Back
							</Button>
						)}

						<Button
							onClick={handleTogglePopup}
							sx={{ mr: 2 }}
							color='primary'
							size='large'
							variant='outlined'
						>
							Create Folder
						</Button>

						<Button
							component='label'
							role={undefined}
							variant='outlined'
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
						>
							Upload
							<VisuallyHiddenInput
								onChange={(e) => fileUploadHandler(e)}
								multiple={true}
								type='file'
							/>
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
		</>
	);
};

export default Disk;
