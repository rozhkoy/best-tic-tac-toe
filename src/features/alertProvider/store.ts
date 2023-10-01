import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert, IAlertState } from './types';

const initialState: IAlertState = {
	alerts: [],
	currentAlert: {
		alertId: '',
		isVisible: false,
		heading: '',
		text: '',
	},
};

export const alertSlice = createSlice({
	name: 'alertSlice',
	initialState,
	reducers: {
		toggleAlertVisible: (state, { payload }: PayloadAction<boolean>) => {
			state.currentAlert.isVisible = payload;
		},
		showNextAlert: (state) => {
			if (state.alerts.length > 1) {
				state.currentAlert = state.alerts[1];
				state.currentAlert.isVisible = true;
			}
			state.alerts.shift();
		},
		removeAlertFromBuffer: (state, { payload }: PayloadAction<string>) => {
			state.alerts = state.alerts.filter((item) => item.alertId !== payload);
		},
		updateInfoinAlert: (state, { payload }: PayloadAction<IAlert>) => {
			if (state.alerts.length === 0) {
				state.currentAlert = payload;
				state.currentAlert.isVisible = true;
			}
			state.alerts.push(payload);
		},
	},
});

export const { toggleAlertVisible, updateInfoinAlert, removeAlertFromBuffer, showNextAlert } = alertSlice.actions;
