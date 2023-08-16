import { server } from '@/shared/api/axios';
import { IFriendResponse, IGetAllRequestsForFriendship, ISearchUsersByNickname } from '../types';
import { IFindAndCount } from '@/shared/types/findAndCount';
import { IUserResponse } from '@/features/accountAuth/types';

export async function searchUsersByNickname(params: ISearchUsersByNickname): Promise<IFindAndCount<Array<IFriendResponse>>> {
	try {
		const response = await server.get<IFindAndCount<Array<IFriendResponse>>>('v1/api/user/searchUsersByNickname', { params });
		if (!response) {
			throw new Error('Error');
		}
		return response.data;
	} catch (e) {
		console.log(e);
		throw new Error('failed');
	}
}

export async function getAllRequestsForFriendship(params: IGetAllRequestsForFriendship): Promise<IFindAndCount<Array<IFriendResponse>>> {
	try {
		const response = await server.get<IFindAndCount<Array<IFriendResponse>>>('v1/api/user/getAllRequestsForFriendship', { params });
		if (!response) {
			throw new Error('Error');
		}
		return response.data;
	} catch (e) {
		console.log(e);
		throw new Error('failed');
	}
}

export async function sendConsentFriendship(formData: FormData): Promise<IUserResponse> {
	try {
		const response = await server.post<IUserResponse>('v1/api/user/acceptFriendshipInvite', formData);
		if (!response) {
			throw new Error('Error');
		}
		return response.data;
	} catch (e) {
		console.log(e);
		throw new Error('failed');
	}
}

export async function getAllFriends(params: ISearchUsersByNickname): Promise<IFindAndCount<Array<IFriendResponse>>> {
	try {
		const response = await server.get<IFindAndCount<Array<IFriendResponse>>>('v1/api/user/getAllFriends', { params });
		if (!response) {
			throw new Error('Error');
		}
		return response.data;
	} catch (e) {
		console.log(e);
		throw new Error('failed');
	}
}
