import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface userState {
	nickName: string;
	email: string;
	isAuth: boolean;
	userId: string;
}

const initialState: userState = {
	nickName: '',
	userId: '',
	email: '',
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: initialState,
	reducers: {
		updateUserInfo: (state, action: PayloadAction<{ email: string }>) => {
			state.nickName = 'test';
			state.email = action.payload.email;
			state.isAuth = true;
		},
	},
});

export const { updateUserInfo } = userSlice.actions;
