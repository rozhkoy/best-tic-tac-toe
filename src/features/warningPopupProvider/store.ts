import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWarnignPopupState } from './types';

const initialState: IWarnignPopupState = {
	isVisible: false,
	redirectPath: '',
};

export const warnignPopupSlice = createSlice({
	name: 'warnignPopupSlice',
	initialState,
	reducers: {
		toggleVisibleWithPath: (state, { payload }: PayloadAction<IWarnignPopupState>) => {
			state.isVisible = payload.isVisible;
			state.redirectPath = payload.redirectPath;
		},
		toggleVisible: (state, { payload }: PayloadAction<boolean>) => {
			state.isVisible = payload;
		},
	},
});

export const { toggleVisibleWithPath, toggleVisible } = warnignPopupSlice.actions;
