import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlert, IAlertState } from './types';
import { nanoid } from 'nanoid';

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
		addAlert: (state, { payload: { heading, text } }: PayloadAction<{ heading: string; text: string }>) => {
			const alertTemplate: IAlert = {
				alertId: nanoid(),
				isVisible: false,
				heading,
				text,
			};

			alertTemplate.isVisible = false;
			if (state.alerts.length === 0) {
				state.currentAlert = alertTemplate;
				state.currentAlert.isVisible = true;
			}

			state.alerts.push(alertTemplate);
		},
	},
});

export const { toggleAlertVisible, addAlert, removeAlertFromBuffer, showNextAlert } = alertSlice.actions;
