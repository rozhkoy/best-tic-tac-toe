import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/features/accountAuth/store/index';

const store = configureStore({
	reducer: { user: userSlice },
});

export default store;
