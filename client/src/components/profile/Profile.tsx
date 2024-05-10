import { Box, Button, Typography, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { deleteAvatar, uploadAvatar } from '../../actions/user';

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

const Profile = () => {
	const dispatch = useAppDispatch();
	const { avatar } = useAppSelector(
		(state) => state.user.currentUser as { avatar: string }
	);

	const avatarUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files && files.length > 0) {
			const file = files[0];
			dispatch(uploadAvatar(file));
		}
	};

	return (
		<Box maxWidth='md' marginInline='auto'>
			<Typography
				variant='h5'
				component='h1'
				sx={{ mb: 3, textAlign: 'center' }}
			>
				Your Profile
			</Typography>
			<Button onClick={() => dispatch(deleteAvatar())}>
				Delete Avatar
			</Button>
			<br />
			<br />
			<Button
				component='label'
				role={undefined}
				variant='outlined'
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
			>
				Upload Avatar
				<VisuallyHiddenInput
					accept='image/*'
					onChange={(e) => avatarUploadHandler(e)}
					type='file'
					disabled={!!avatar}
				/>
			</Button>
		</Box>
	);
};

export default Profile;
