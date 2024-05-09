import { Box, Button, Grid, styled } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TFile } from '../../../../libs/definitions';
import { useAppDispatch, useAppSelector } from '../../../../reducers/hooks';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { Link } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFile, downloadFile } from '../../../../actions/file';
import { formatBytes } from '../../../../libs/utils';
import { blue } from '@mui/material/colors';

const FileLink = styled(Link)({
	color: 'white',
	textDecoration: 'none',
});

const File = ({ file }: { file: TFile }) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	const openDirHandler = () => {
		if (file.type === 'dir') {
			dispatch(pushToStack(currentDir));
			dispatch(setCurrentDir(file._id));
		}
	};

	const downloadHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		downloadFile(file);
	};

	const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteFile(file));
	};

	return (
		<Grid
			container
			sx={{
				p: 2,
				borderTop: '1px solid white',
				display: 'flex',
				alignItems: 'center',
				'&:hover': {
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
				},
			}}
		>
			<Grid
				item
				xs={7}
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{file.type === 'dir' ? (
					<FileLink
						onClick={openDirHandler}
						to={`/${file._id}`}
						sx={{ display: 'inline-flex', alignItems: 'center' }}
					>
						<FolderIcon sx={{ mr: 2, color: blue[200] }} />
						{file.name}
					</FileLink>
				) : (
					<Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
						<InsertDriveFileIcon sx={{ mr: 2, color: blue[200] }} />
						{file.name}
					</Box>
				)}
			</Grid>
			<Grid
				item
				xs={2}
				sx={{ display: 'flex', justifyContent: 'flex-end' }}
			>
				{file.date.slice(0, 10)}
			</Grid>
			<Grid
				item
				xs={3}
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				{file.type !== 'dir' && (
					<Button
						onClick={(e) => downloadHandler(e)}
						sx={{
							minWidth: '0',
							mr: 1,
						}}
					>
						<CloudDownloadIcon />
					</Button>
				)}
				<Button
					onClick={(e) => deleteHandler(e)}
					sx={{
						minWidth: '0',
						mr: 1,
					}}
				>
					<DeleteIcon />
				</Button>
				{formatBytes(file.size)}
			</Grid>
		</Grid>
	);
};

export default File;
