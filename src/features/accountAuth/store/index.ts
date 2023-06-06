import { createSlice } from '@reduxjs/toolkit';

interface userState {
	userName: string;
}

const initialState: userState = {
	userName: 'test',
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState: initialState,
	reducers: {
		updateUserInfo: (state) => {
			state.userName = 'test';
		},
	},
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
