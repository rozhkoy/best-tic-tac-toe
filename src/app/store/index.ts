import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user/store/index';
import { notifsSlice } from '@/features/notifications/store';

const store = configureStore({
	reducer: { user: userSlice.reducer, notifs: notifsSlice.reducer },
});

export default store;
