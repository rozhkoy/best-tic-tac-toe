import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { useContext } from 'react';
import { IPaginationInfo, IRejectionInviteToGame, ISendInviteToGame, IUseFriendsActionsResponse } from '../types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';

export function useFriendsActions(): IUseFriendsActionsResponse {
	const webSocket = useContext(WebSocketContext);

	function sendInviteToGame(friendId: string, userId: string, paginationInfo?: IPaginationInfo) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId,
			data: {
				friendId,
				paginationInfo,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		return true;
	}

	function sendRejectionInviteToGame(friendId: string, userId: string) {
		const message: IWebSocketMessage<IRejectionInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_REJECTED,
			userId: userId,
			data: {
				friendId,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		return true;
	}

	function sendDeclineInviteToGame(friendId: string, userId: string) {
		const message: IWebSocketMessage<IRejectionInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_DECLINE,
			userId: userId,
			data: {
				friendId,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		return true;
	}

	return { sendInviteToGame, sendDeclineInviteToGame, sendRejectionInviteToGame };
}
