import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	InputLabel,
	LinearProgress,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createDir, getFiles, uploadFile } from '../../actions/file';
import FileList from './fileList/FileList';
import { popFromStack } from '../../reducers/fileReducer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';
import { hideUploader } from '../../reducers/uploadReducer';
import Loader from '../loader/Loader';

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
	const [dragEnter, setDragEnter] = useState(false);
	const [sort, setSort] = useState('type');

	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);
	const loader = useAppSelector((state) => state.app.loader);

	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, dispatch, sort]);

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

	const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(true);
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(false);
	};

	const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const files = [...e.dataTransfer.files];

		if (files) {
			[...files].forEach((file) =>
				dispatch(uploadFile(file, currentDir))
			);
		}

		setDragEnter(false);
	};

	const { isVisible, files } = useAppSelector((state) => state.upload);

	if (loader) {
		return <Loader />;
	}

	return !dragEnter ? (
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
			<Box
				maxWidth='md'
				marginInline='auto'
				onDragEnter={dragEnterHandler}
				onDragLeave={dragLeaveHandler}
				onDragOver={dragEnterHandler}
			>
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
						<FormControl sx={{ width: '150px' }}>
							<InputLabel id='select-label'>Sort</InputLabel>
							<Select
								labelId='select-label'
								id='sort'
								value={sort}
								label='Age'
								onChange={(e) => setSort(e.target.value)}
							>
								<MenuItem value='name'>By name</MenuItem>
								<MenuItem value='type'>By type</MenuItem>
								<MenuItem value='date'>By date</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<FileList />
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={isVisible}
				onClose={() => dispatch(hideUploader())}
			>
				<Alert
					onClose={() => dispatch(hideUploader())}
					severity='info'
					variant='filled'
					sx={{ width: '350px', color: 'white' }}
				>
					{files.map((file) => (
						<Fragment key={file.id}>
							{file.name}{' '}
							<LinearProgress
								sx={{
									margin: '5px 0 10px',
									width: '240px',
									color: 'white',
								}}
								variant='determinate'
								value={file.progress}
							/>
						</Fragment>
					))}
				</Alert>
			</Snackbar>
		</>
	) : (
		<Box
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
			onDrop={dropHandler}
			marginInline='auto'
			sx={{
				height: '70vh',
				border: '2px dashed white',
				borderRadius: '10px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Typography
				variant='h5'
				component='h1'
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CloudUploadIcon
					sx={{
						mr: 2,
						width: 50,
						height: 50,
					}}
				/>
				Drag and drop the file here...
			</Typography>
		</Box>
	);
};

export default Disk;
