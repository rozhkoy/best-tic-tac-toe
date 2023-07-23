import { server } from '@/shared/api/axios';
import { ISearchUsersByNickname } from '../types';
import { IFindAndCount } from '@/shared/types/findAndCount';
import { IUserResponse } from '@/features/accountAuth/types';

export async function searchUsersByNickname(params: ISearchUsersByNickname): Promise<IFindAndCount<Array<IUserResponse>>> {
	try {
		const response = await server.get<IFindAndCount<Array<IUserResponse>>>('v1/api/user/searchUsersByNickname', { params });
		if (!response) {
			throw new Error('Error');
		}
		return response.data;
	} catch (e) {
		console.log(e);
		throw new Error('failed');
	}
}
