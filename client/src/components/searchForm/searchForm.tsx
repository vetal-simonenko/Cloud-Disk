import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { searchFiles } from '../../actions/file';
import debounce from 'debounce';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const SearchForm = () => {
	const [searchName, setSearchName] = useState('');
	const dispatch = useAppDispatch();

	const debouncedSearchChangeHandler = debounce((value: string) => {
		dispatch(searchFiles(value));
	}, 500);

	const searchChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value } = e.target;
		setSearchName(value);

		if (value !== '') {
			debouncedSearchChangeHandler(value);
		} else {
			dispatch(searchFiles(value));
		}
	};

	return (
		<Search sx={{ margin: '0 0 0 auto' }}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				type='search'
				value={searchName}
				onChange={(e) => searchChangeHandler(e)}
				placeholder='Search…'
				inputProps={{ 'aria-label': 'search' }}
			/>
		</Search>
	);
};

export default SearchForm;
