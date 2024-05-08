import { Button, Grid, styled } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TFile } from '../../../../libs/definitions';
import { useAppDispatch, useAppSelector } from '../../../../reducers/hooks';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { Link, useNavigate } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFile, downloadFile } from '../../../../actions/file';

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
			<Grid item xs={7}>
				<FileLink
					onClick={openDirHandler}
					to={`/${file._id}`}
					sx={{ display: 'inline-flex', alignItems: 'center' }}
				>
					{file.type === 'dir' ? (
						<FolderIcon sx={{ mr: 2 }} />
					) : (
						<InsertDriveFileIcon sx={{ mr: 2 }} />
					)}{' '}
					{file.name}
				</FileLink>
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
				{`${(file.size / 1000000).toFixed(3)} Mb`}
			</Grid>
		</Grid>
	);
};

export default File;
