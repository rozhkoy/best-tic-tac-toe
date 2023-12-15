import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisible: false,
};

export const settingsSlice = createSlice({
	name: 'settingsSlice',
	initialState,
	reducers: {
		toggleSettingsVisible: (state) => {
			state.isVisible = !state.isVisible;
		},
	},
});

export const { toggleSettingsVisible } = settingsSlice.actions;
