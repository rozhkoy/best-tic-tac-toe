import { server } from '@/shared/api/axios';
import { IGetUserInfoByUid, IRegistrationUserInfo } from './types';

export async function getUserInfoByUid(params: IGetUserInfoByUid) {
	const { data } = await server.get('/v1/api/user/getUserInfoByUid', { params });
	return data;
}

export async function registrationNewUser(formData: FormData) {
	const { data } = await server.post('/v1/api/user/registration', formData);
	return data;
}
