import { Grid } from '@mui/material';
import { useAppSelector } from '../../../reducers/hooks';
import { TFile } from '../../../libs/definitions';
import FileTileItem from './file/FileTileItem';

const FileList = () => {
	const files: TFile[] = useAppSelector((state) => state.files.files);

	if (files.length === 0) {
		return <div>Files not found...</div>;
	}

	return (
		<>
			<Grid container spacing={2}>
				{files.map((file) => (
					<FileTileItem file={file} key={file._id} />
				))}
			</Grid>
		</>
	);
};

export default FileList;
