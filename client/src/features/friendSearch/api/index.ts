import { server } from '@/shared/api/axios';
import { ISearchUsersByNickname, ListOfUserResponse } from '../types';
import { IPaginationResponse } from '@/shared/types/findAndCount';

export async function searchUsersByNickname({ userId, page, perPage, query }: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>(`api/v1/users/all/${userId}`, { params: { perPage, page, query } });
	return response.data;
}

export async function getAllRequestsForFriendship({ userId, page, perPage, query }: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>(`/api/v1/friends/requests/all/${userId}`, { params: { perPage, page, query } });
	return response.data;
}

export async function sendInviteToFriendship(userId: string, formData: FormData): Promise<{ invitationId: string }> {
	const response = await server.post<{ invitationId: string }>(`api/v1/friends/requests/send/${userId}`, formData);
	return response.data;
}

export async function sendAcceptFriendshipInvite(invitationId: string): Promise<boolean> {
	const response = await server.patch<boolean>(`api/v1/friends/requests/accept/${invitationId}`);
	return response.data;
}

export async function sendRejectFriendshipInvite(invitationId: string): Promise<boolean> {
	const response = await server.delete<boolean>(`/api/v1/friends/requests/reject/${invitationId}`);
	return response.data;
}

export async function getAllFriends({ userId, page, perPage, query }: ISearchUsersByNickname): Promise<IPaginationResponse<Array<ListOfUserResponse>>> {
	const response = await server.get<IPaginationResponse<Array<ListOfUserResponse>>>(`/api/v1/friends/all/${userId}`, { params: { perPage, page, query } });
	return response.data;
}
