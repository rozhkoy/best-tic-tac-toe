import { useRef } from 'react';

import { IUpdateUserStatusData, IUserEvents } from '@/entities/user/types';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { UserEvents } from '@/entities/user';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { ICellData } from '@/shared/ui/fieldCell/types';
import { userEventNames } from '@/entities/user/lib/userEventNames';
import { IUpateGameStateData } from '../types';
import { socket } from './webSocketConnection';

export function useWebSocketConnection({ getGameState }: { getGameState: (data: IUpateGameStateData) => void }): {
	webSocketConnect: () => void;
	sendGameState: (playFiledState: Array<ICellData>) => void;
} {
	const userWebSocketEvents = useRef<IUserEvents>(new UserEvents());
	const userData = useAppSelector((state) => state.user);

	function webSocketConnect() {
		socket.onopen = (event) => {
			if (socket) {
				socket.send(JSON.stringify(userWebSocketEvents.current.updateUserStatus('online', userData.userId)));
			}
		};
		socket.onmessage = (event) => {
			const message: IWebSocketMessage<IUpateGameStateData> = JSON.parse(event.data);
			console.log(message);
			console.log('check getGameState', getGameState);
			// if (getGameState) {
			getGameState(message.data);
			// }

			// switch (message.event) {
			// 	case 'UPDATE_GAME_STATE':
			// 		getGameState(message.data);
			// 		break;
			// }
		};
		console.log(socket.readyState);
	}

	function sendGameState(playFiledState: Array<ICellData>) {
		if (socket) {
			console.log('send');
			const message: IWebSocketMessage<IUpateGameStateData> = {
				event: userEventNames.UPDATE_GAME_STATE,
				userId: userData.userId,
				data: {
					playFiledState: playFiledState,
				},
			};

			socket.send(JSON.stringify(message));
		}
	}

	return { webSocketConnect, sendGameState };
}
