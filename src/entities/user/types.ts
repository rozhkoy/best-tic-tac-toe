import { IWebSocketMessage } from '@/shared/types/webSocketMessage';

export interface UserInfoProps {
	nickname: string;
	rating: number;
}

export interface IUpdateUserStatusData {
	status: string;
}

export interface IUserEvents {
	updateUserStatus(status: string, userId: string): IWebSocketMessage<IUpdateUserStatusData>;
}
