import { userSlice } from '@/entities/user/store';
export { UserPanel } from './ui/userInfo';
export { userSlice } from '@/entities/user/store';
export const { updateUserInfo, updateUserRating, updateIsPlayingStatus, updateIsloadedStatus } = userSlice.actions;
