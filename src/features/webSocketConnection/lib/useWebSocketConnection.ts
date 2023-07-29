import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import webSocketConnection from './webSocketConnection';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from './websocketEventNames';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { IUpdateUserStatusData } from '@/entities/user/types';
import { ICellData } from '@/shared/ui/fieldCell/types';
import { IAcceptInviteToGame, ISendInviteToFriendship, ISendInviteToGame, IUpateGameStateData, IUseWebsocketConectionReturn, UseWebsocketConnecctionProps } from '../types';

export function useWebSocketConnection({
	updateGameState,
	showInviteToFriendship,
	handleGameInvitationSent,
	handleInviteToGameIsAccepted,
}: UseWebsocketConnecctionProps): IUseWebsocketConectionReturn {
	const websocketInstance: WebSocket = webSocketConnection.getConnectionInstance();
	const userInfo = useAppSelector((state) => state.user);

	websocketInstance.addEventListener('open', () => {
		webSocketConnection.setReadyState(1);
	});

	websocketInstance.addEventListener('error', () => {
		alert('Something is wrong');
	});

	websocketInstance.onmessage = (event) => {
		const message = JSON.parse(event.data);

		switch (message.event) {
			case websocketEventNames.UPDATE_GAME_STATE:
				if (updateGameState) {
					updateGameState(message.data.playFiledState);
				}
				break;
			case websocketEventNames.SEND_INVITE_TO_FRIENDSHIP:
				if (showInviteToFriendship) {
					showInviteToFriendship();
				}
				break;
			case websocketEventNames.INVITE_TO_GAME:
				if (handleGameInvitationSent) {
					handleGameInvitationSent(message.userId);
				}
				break;
			case websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED:
				if (handleInviteToGameIsAccepted) {
					handleInviteToGameIsAccepted(message.data.sessionId);
				}
				break;
		}
	};

	function udpateUserStatus(status: UserStatusTypes) {
		const message: IWebSocketMessage<IUpdateUserStatusData> = {
			event: websocketEventNames.UPDATE_USER_STATUS,
			userId: userInfo.userId,
			data: {
				status,
			},
		};
		websocketInstance.send(JSON.stringify(message));
	}

	function sendGameState(gameState: Array<ICellData>) {
		const message: IWebSocketMessage<IUpateGameStateData> = {
			event: websocketEventNames.UPDATE_GAME_STATE,
			userId: userInfo.userId,
			data: {
				playFiledState: gameState,
			},
		};

		websocketInstance.send(JSON.stringify(message));
	}

	function sendInviteToFriendShip(invitationUserId: string) {
		const message: IWebSocketMessage<ISendInviteToFriendship> = {
			event: websocketEventNames.SEND_INVITE_TO_FRIENDSHIP,
			userId: userInfo.userId,
			data: {
				invitationUserId,
			},
		};

		websocketInstance.send(JSON.stringify(message));
	}

	function sendInviteToGame(friendId: string) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId: userInfo.userId,
			data: {
				friendId,
			},
		};

		websocketInstance.send(JSON.stringify(message));
	}

	function acceptInviteToGame(friendId: string) {
		console.log(friendId);
		const message: IWebSocketMessage<IAcceptInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED,
			userId: userInfo.userId,
			data: {
				friendId,
			},
		};

		websocketInstance.send(JSON.stringify(message));
	}

	return { udpateUserStatus, sendGameState, sendInviteToFriendShip, sendInviteToGame, acceptInviteToGame };
}
