import { Grid, styled } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TFile } from '../../../../libs/definitions';
import { useAppDispatch, useAppSelector } from '../../../../reducers/hooks';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { Link } from 'react-router-dom';

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

	return (
		<Grid
			onClick={openDirHandler}
			container
			component={FileLink}
			to={`/${file._id}`}
			sx={{
				p: 2,
				borderTop: '1px solid white',
				display: 'flex',
				alignItems: 'center',
				'&:hover': {
					cursor: 'pointer',
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
				},
			}}
		>
			<Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
				{file.type === 'dir' ? (
					<FolderIcon sx={{ mr: 2 }} />
				) : (
					<InsertDriveFileIcon sx={{ mr: 2 }} />
				)}{' '}
				{file.name}
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
				xs={2}
				sx={{ display: 'flex', justifyContent: 'flex-end' }}
			>
				{`${(file.size / 1000000).toFixed(3)} Mb`}
			</Grid>
		</Grid>
	);
};

export default File;
