import { Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { TFile } from '../../../../libs/definitions';
import { useAppDispatch, useAppSelector } from '../../../../reducers/hooks';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';

const File = ({ file }: { file: TFile }) => {
	const dispatch = useAppDispatch();
	const currentDir = useAppSelector((state) => state.files.currentDir);

	const openDirHandler = () => {
		dispatch(pushToStack(currentDir));
		dispatch(setCurrentDir(file._id));
	};

	return (
		<Grid
			onClick={() => {
				file.type === 'dir' ? openDirHandler() : '';
			}}
			container
			sx={{
				mb: 2,
				borderTop: '1px solid white',
				pt: 2,
				display: 'flex',
				alignItems: 'center',
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
				{file.size}
			</Grid>
		</Grid>
	);
};

export default File;
