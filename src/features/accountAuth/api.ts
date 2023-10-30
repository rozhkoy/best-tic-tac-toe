import { server } from '@/shared/api/axios';
import { IGetUserInfoByUid, IRegistrationRespone, IUserResponse } from './types';

export async function getUserInfoByUid(params: IGetUserInfoByUid) {
	const { data } = await server.get<IUserResponse>('/v1/api/user/getUserInfoByUid', { params });
	return data;
}

export async function registrationNewUser(formData: FormData) {
	const { data } = await server.post<IRegistrationRespone>('/v1/api/user/registration', formData);
	return data;
}

export async function getUserRating(params: { userId: string }) {
	const { data } = await server.get<number>('/v1/api/user/getUserRating', { params });
	return data;
}
