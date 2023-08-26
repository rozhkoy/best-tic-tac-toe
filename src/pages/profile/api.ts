import { server } from '@/shared/api/axios';
import { IGetGameHistoryByUserId, IGetUserInfoByUserId } from './types';
import { IUserResponse } from '@/features/accountAuth/types';
import { IGameHistoryItemResponse, IPaginationResponse } from '@/shared/types/findAndCount';

export async function getUserInfoByUserId(params: IGetUserInfoByUserId) {
	const { data } = await server.get<IUserResponse>('/v1/api/user/getUserInfoByUserId', { params });
	return data;
}

export async function getGameHistoryByUserId(params: IGetGameHistoryByUserId) {
	const { data } = await server.get<IPaginationResponse<Array<IGameHistoryItemResponse>>>('/v1/api/user/getGameHistoryByUserId', { params });
	return data;
}
