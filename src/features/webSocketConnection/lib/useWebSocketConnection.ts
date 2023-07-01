import { useRef } from 'react';

import { IUserEvents } from '@/entities/user/types';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { UserEvents } from '@/entities/user';

export function useWebSocketConnection(): { webSocketConnect: () => void } {
	const socket = useRef<WebSocket>();
	const userWebSocketEvents = useRef<IUserEvents>(new UserEvents());
	const userData = useAppSelector((state) => state.user);

	function webSocketConnect() {
		socket.current = new WebSocket('ws://localhost:5000');

		socket.current.onopen = (event) => {
			if (socket.current) {
				socket.current.send(JSON.stringify(userWebSocketEvents.current.updateUserStatus('online', userData.userId)));
			}
		};
	}

	return { webSocketConnect };
}
