import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
	nickname: string;
	rating: number;
	isAuth: boolean;
	userId: number;
}

interface IUpdateUserInfo {
	nickname: string;
	rating: number;

	userId: number;
}

const initialState: IUserState = {
	nickname: '',
	userId: 0,
	rating: 0,
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: initialState,
	reducers: {
		updateUserInfo: (state, { payload }: PayloadAction<IUpdateUserInfo>) => {
			state.nickname = payload.nickname;
			state.rating = payload.rating;
			state.userId = payload.userId;
		},
		updateAuthState: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuth = payload;
		},
	},
});

export const { updateUserInfo, updateAuthState } = userSlice.actions;
