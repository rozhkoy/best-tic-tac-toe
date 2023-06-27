import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user/store/index';

const store = configureStore({
	reducer: { user: userSlice.reducer },
});

export default store;
