import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user/store/index';
import { notifsSlice } from '@/features/notifications/store';
import { alertSlice } from '@/features/alertProvider';
import { settingsSlice } from '@/features/settings/store';
import { themeSlice } from '@/features/theme';
import { preloaderSlice } from '@/features/preloader/store';

const store = configureStore({
	reducer: { user: userSlice.reducer, notifs: notifsSlice.reducer, alert: alertSlice.reducer, settings: settingsSlice.reducer, theme: themeSlice.reducer, preloader: preloaderSlice.reducer },
});

export default store;
