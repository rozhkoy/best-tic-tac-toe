import { server } from '@/shared/api/axios';
import { ISearchUsersByNickname, ListOfUserResponse } from '../types';
import { IPaginationResponse } from '@/shared/types/findAndCount';

export async function searchUsersByNickname(params: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>('v1/api/user/searchUsersByNickname', { params });
	return response.data;
}

export async function getAllRequestsForFriendship(params: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>('v1/api/user/getAllRequestsForFriendship', { params });
	return response.data;
}

export async function sendInviteToFriendship(formData: FormData): Promise<{ invitationId: string }> {
	const response = await server.post<{ invitationId: string }>('v1/api/user/sendInviteToFriendship', formData);
	return response.data;
}

export async function sendAcceptFriendshipInvite(formData: FormData): Promise<boolean> {
	const response = await server.post<boolean>('v1/api/user/acceptFriendshipInvite', formData);
	return response.data;
}

export async function sendRejectFriendshipInvite(formData: FormData): Promise<boolean> {
	const response = await server.post<boolean>('v1/api/user/rejectFriendshipInvite', formData);
	return response.data;
}

export async function getAllFriends(params: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>('v1/api/user/getAllFriends', { params });
	return response.data;
}
