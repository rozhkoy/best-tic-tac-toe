import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
	nickname: string;
	rating: number;
	isAuth: boolean;
	userId: string;
}

const initialState: IUserState = {
	nickname: '',
	userId: '',
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
			state.isAuth = payload.isAuth;
			state.userId = payload.userId;
		},
	},
});

export const { updateUserInfo } = userSlice.actions;
