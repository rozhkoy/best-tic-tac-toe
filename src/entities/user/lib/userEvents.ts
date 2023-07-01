import { WebSocketMessage } from '@/shared/types/webSocketMessage';
import { IUpdateUserStatusData, IUserEvents } from '../types';
import { userEventNames } from './userEventNames';

export class UserEvents implements IUserEvents {
	updateUserStatus(status: string, userId: string): WebSocketMessage<IUpdateUserStatusData> {
		return {
			message: userEventNames.UPDATE_USER_STATUS,
			data: {
				userId,
				status,
			},
		};
	}
}
