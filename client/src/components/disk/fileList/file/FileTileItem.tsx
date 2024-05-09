import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardHeader,
	Grid,
	IconButton,
	styled,
} from '@mui/material';
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
		<Grid item xs={3}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							sx={{ bgcolor: 'white', color: blue[200] }}
							aria-label='recipe'
						>
							{file.type === 'dir' ? (
								<FileLink
									onClick={openDirHandler}
									to={`/${file._id}`}
								>
									<FolderIcon
										sx={{
											color: blue[200],
											width: '30px',
											height: '30px',
										}}
									/>
								</FileLink>
							) : (
								<InsertDriveFileIcon
									sx={{
										color: blue[200],
										width: '30px',
										height: '30px',
									}}
								/>
							)}
						</Avatar>
					}
					title={file.name}
					subheader={file.date.slice(0, 10)}
				/>

				<CardActions disableSpacing>
					{file.type !== 'dir' && (
						<IconButton
							onClick={(e) => downloadHandler(e)}
							aria-label='add to favorites'
						>
							<CloudDownloadIcon sx={{ color: blue[200] }} />
						</IconButton>
					)}

					<IconButton
						onClick={(e) => deleteHandler(e)}
						aria-label='share'
					>
						<DeleteIcon sx={{ color: blue[200] }} />
					</IconButton>
					<Box sx={{ margin: '0 10px 0 auto' }}>
						{formatBytes(file.size)}
					</Box>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default File;
