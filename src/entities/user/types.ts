import { IWebSocketMessage } from '@/shared/types/webSocketMessage';

export interface UserInfoProps {
	nickname: string;
	rating: number;
}

export interface IUpdateUserStatusData {
	userId: string;
	status: string;
}

export interface IUserEvents {
	updateUserStatus(status: string, userId: string): IWebSocketMessage<IUpdateUserStatusData>;
}
