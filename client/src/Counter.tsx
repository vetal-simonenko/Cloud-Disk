import type { RootState } from './reducers/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducers/counterReducer';

const Counter = () => {
	const count = useSelector(
		(state: RootState) => state.counter.value
	);

	const dispatch = useDispatch();

	return (
		<div>
			<button
				onClick={() => {
					dispatch(increment(10));
				}}
			>
				Increase
			</button>
			{count}
			<button
				onClick={() => {
					dispatch(decrement());
				}}
			>
				Decrease
			</button>
		</div>
	);
};

export default Counter;
