import { InviteToGameNotifsProps } from '@/shared/ui/inviteToGameNotif/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: INotifsState = {
	notifs: [],
	isVisible: true,
};

export interface INotifsState {
	notifs: Array<InviteToGameNotifsProps>;
	isVisible: boolean;
}

export const notifsSlice = createSlice({
	name: 'notifsSlise',
	initialState,
	reducers: {
		addNotif: (state, { payload }: PayloadAction<InviteToGameNotifsProps>) => {
			state.notifs.push({ ...payload });
		},
		removeNotif: (state, { payload }: PayloadAction<string>) => {
			console.log(payload);
			state.notifs = state.notifs.filter((item) => item.id !== payload);
		},
		toggleVisible: (state, { payload: { id, isVisible } }: PayloadAction<{ id: string; isVisible: boolean }>) => {
			const index = state.notifs.findIndex((item) => item.id === id);
			state.notifs[index].isVisible = isVisible;
		},
		toggleNotificationsVisible: (state, { payload }: PayloadAction<boolean>) => {
			state.isVisible = payload;
		},
	},
});

export const { addNotif, toggleVisible, removeNotif, toggleNotificationsVisible } = notifsSlice.actions;
