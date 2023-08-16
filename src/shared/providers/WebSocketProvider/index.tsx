import webSocketConnection from '@/shared/api/webSocketConnection';
import { PropsWithChildren, createContext, useCallback, useEffect, useRef } from 'react';
import { IWebSocketProvider } from './types';

export const WebSocketContext = createContext<IWebSocketProvider | null>(null);

export const WebSocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const subscribers = useRef(new Map<string, (message: any) => void>());

	const subscribeToOnUpdate = useCallback((event: string, callback: (message: any) => void) => {
		subscribers.current.set(event, callback);
		return () => subscribers.current.delete(event);
	}, []);

	const unSubscribeToOnUpdate = useCallback((event: string) => {
		subscribers.current.delete(event);
	}, []);

	useEffect(() => {
		const webSocket = webSocketConnection.getConnectionInstance();

		webSocket.onerror = (error) => {
			alert(error);
		};

		webSocket.onmessage = (event) => {
			const message = JSON.parse(event.data);

			const subscription = subscribers.current.get(message.event);

			if (!subscription) {
				return;
			}

			subscription(message);
		};
	}, []);

	const value: IWebSocketProvider = {
		instance: webSocketConnection.getConnectionInstance(),
		subscribeToOnUpdate,
		unSubscribeToOnUpdate,
	};

	return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
