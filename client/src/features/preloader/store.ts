import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisible: true,
};

export const preloaderSlice = createSlice({
	name: 'preloaderSlice',
	initialState,
	reducers: {
		togglePreloaderVisible: (state, { payload }: PayloadAction<boolean>) => {
			state.isVisible = payload;
		},
	},
});

export const { togglePreloaderVisible } = preloaderSlice.actions;
