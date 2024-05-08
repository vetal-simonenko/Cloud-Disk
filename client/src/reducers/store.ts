import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';

export const store = configureStore({
	reducer: {
		user: userReducer,
		files: fileReducer,
		upload: uploadReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
