import { server } from '@/shared/api/axios';
import { IGetGameHistoryByUserId, IGetProfileInfoByUserId, IProfileInfoByUserIdResponse } from './types';
import { IGameHistoryItemResponse, IPaginationResponse } from '@/shared/types/findAndCount';

export async function getProfileInfoByUserId({ targetUser, userId }: IGetProfileInfoByUserId) {
	const { data } = await server.get<IProfileInfoByUserIdResponse>(`/api/v1/users/profile/${targetUser}`, { params: { userId } });
	return data;
}

export async function getGameHistoryByUserId({ userId }: IGetGameHistoryByUserId) {
	const { data } = await server.get<IPaginationResponse<Array<IGameHistoryItemResponse>>>(`/api/v1/users/histories/${userId}`);
	return data;
}
