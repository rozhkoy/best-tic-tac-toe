import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import webSocketConnection from './webSocketConnection';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from './websocketEventNames';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { IUpdateUserStatusData } from '@/entities/user/types';
import { ICellData } from '@/shared/ui/fieldCell/types';
import { IUpateGameStateData, IUseWebsocketConectionReturn, UseWebsocketConnecctionProps } from '../types';

export function useWebSocketConnection({ updateGameState }: UseWebsocketConnecctionProps): IUseWebsocketConectionReturn {
	const websocketInstance: WebSocket = webSocketConnection.getConnectionInstance();
	const userInfo = useAppSelector((state) => state.user);
	websocketInstance.addEventListener('open', () => {
		webSocketConnection.setReadyState(1);
	});

	websocketInstance.addEventListener('error', () => {
		alert('Something is wrong');
	});

	websocketInstance.addEventListener('message', (event) => {
		console.log(event.data);
		const message = JSON.parse(event.data);

		switch (message.event) {
			case websocketEventNames.UPDATE_GAME_STATE:
				if (updateGameState) {
					updateGameState(message.data.playFiledState);
				}
				break;
		}
	});

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

	return { udpateUserStatus, sendGameState };
}
