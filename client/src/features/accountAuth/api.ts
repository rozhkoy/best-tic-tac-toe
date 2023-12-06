import { server } from '@/shared/api/axios';
import { IGetUserInfoByUid, IUserResponse } from './types';

export async function getUserInfoByUid({ uid }: IGetUserInfoByUid) {
	const { data } = await server.patch<IUserResponse>(`/api/v1/users/info/${uid}`);
	return data;
}

export async function registrationNewUser(formData: FormData) {
	const { data } = await server.post<IUserResponse>('/api/v1/users/registration', formData);
	return data;
}

export async function getUserRating({ userId }: { userId: string }) {
	const { data } = await server.get<number>(`/api/v1/users/rating/${userId}`);
	return data;
}
