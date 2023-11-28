import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisible: false,
};

export const settingsSlice = createSlice({
	name: 'settingsSlice',
	initialState,
	reducers: {
		toggleSettingsVisible: (state) => {
			console.log(state);
			state.isVisible = !state.isVisible;
		},
	},
});

export const { toggleSettingsVisible } = settingsSlice.actions;
