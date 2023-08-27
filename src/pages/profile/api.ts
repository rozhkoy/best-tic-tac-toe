import { server } from '@/shared/api/axios';
import { IGetGameHistoryByUserId, IGetProfileInfoByUserId, IProfileInfoByUserIdResponse } from './types';
import { IGameHistoryItemResponse, IPaginationResponse } from '@/shared/types/findAndCount';

export async function getProfileInfoByUserId(params: IGetProfileInfoByUserId) {
	const { data } = await server.get<IProfileInfoByUserIdResponse>('/v1/api/user/getProfileInfoByUserId', { params });
	return data;
}

export async function getGameHistoryByUserId(params: IGetGameHistoryByUserId) {
	const { data } = await server.get<IPaginationResponse<Array<IGameHistoryItemResponse>>>('/v1/api/user/getGameHistoryByUserId', { params });
	return data;
}
