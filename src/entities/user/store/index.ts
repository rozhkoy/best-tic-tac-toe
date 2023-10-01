import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
	nickname: string;
	rating: number;
	isAuth: boolean;
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
		updateUserInfo: (state, { payload }: PayloadAction<IUserState>) => {
			state.nickname = payload.nickname;
			state.rating = payload.rating;
			state.userId = payload.userId;
			state.isAuth = payload.isAuth;
		},
	},
});

export const { updateUserInfo } = userSlice.actions;
