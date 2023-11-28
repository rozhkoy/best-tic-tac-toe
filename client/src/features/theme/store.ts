import { IThemeSliceState } from './types';
import { themeTypes } from './../settings/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IThemeSliceState = {
	color: 'auto',
};

export const themeSlice = createSlice({
	name: 'themeSlice',
	initialState,
	reducers: {
		updateTheme: (state, { payload }: PayloadAction<themeTypes>) => {
			state.color = payload;
		},
	},
});

export const { updateTheme } = themeSlice.actions;
