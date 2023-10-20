import { IWebSocketMessage } from '@/shared/types/webSocketMessage';

export interface UserInfoProps {
	nickname: string;
	rating: number;
	url: string;
}

export interface IUpdateUserStatusData {
	status: string;
}

export interface IUserEvents {
	updateUserStatus(status: string, userId: string): IWebSocketMessage<IUpdateUserStatusData>;
}

export interface IUserState {
	nickname: string;
	rating: number;
	isAuth: boolean;
	userId: string;
	url: string;
}
