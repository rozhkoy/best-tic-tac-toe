import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../types';

const initialState: IUserState = {
	nickname: '',
	userId: '',
	rating: 0,
	isAuth: false,
	url: '',
	isloaded: false,
	isPlaying: false,
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
			state.url = `https://source.boringavatars.com/beam/100/${payload.nickname}`;
		},
		updateUserRating: (state, { payload }: PayloadAction<number>) => {
			state.rating = payload;
		},
		updateIsloadedStatus: (state, { payload }: PayloadAction<boolean>) => {
			state.isloaded = payload;
		},
		updateIsPlayingStatus: (state, { payload }: PayloadAction<boolean>) => {
			state.isPlaying = payload;
		},
	},
});

export const { updateUserInfo, updateUserRating, updateIsloadedStatus, updateIsPlayingStatus } = userSlice.actions;
