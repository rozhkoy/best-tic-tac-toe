import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { IUpdateUserStatusData, IUserEvents } from '../types';
import { userEventNames } from './userEventNames';

export class UserEvents implements IUserEvents {
	updateUserStatus(status: string, userId: string): IWebSocketMessage<IUpdateUserStatusData> {
		return {
			event: userEventNames.UPDATE_USER_STATUS,
			userId,
			data: {
				userId,
				status,
			},
		};
	}
}
