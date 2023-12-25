import webSocketConnection from '@/shared/api/webSocketConnection';
import { createContext, useCallback, useEffect, useRef } from 'react';
import { IWebSocketProvider, WebsoketProviderProps } from './types';
import { error } from 'console';

export const WebSocketContext = createContext<IWebSocketProvider | null>(null);

export const WebSocketProvider: React.FC<WebsoketProviderProps> = ({ children, url, useWebSocket }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const subscribers = useRef(new Map<string, (message: any) => void>());
	const webSocketInstance = useRef<WebSocket>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const subscribeToOnUpdate = useCallback((event: string, callback: (message: any) => void) => {
		subscribers.current.set(event, callback);
		return () => subscribers.current.delete(event);
	}, []);

	const unSubscribeToOnUpdate = useCallback((event: string) => {
		subscribers.current.delete(event);
	}, []);

	const buffer = useRef(new Set<any>());

	useEffect(() => {
		if (useWebSocket) {
			webSocketInstance.current = webSocketConnection.getConnectionInstance(url);

			webSocketInstance.current.onerror = (error) => {
				webSocketConnection.updateReadyState();
				console.log(error);
			};

			webSocketInstance.current.onopen = () => {
				webSocketConnection.setReadyState(WebSocket.OPEN);
				if (buffer.current.size) {
					buffer.current.forEach((message) => {
						webSocketInstance.current?.send(message);
					});
				}
			};

			webSocketInstance.current.onmessage = (event) => {
				const message = JSON.parse(event.data);
				const subscription = subscribers.current.get(message.event);

				if (!subscription) {
					return;
				}

				subscription(message);
			};
		}
	}, [useWebSocket, url]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (webSocketConnection.readyState === WebSocket.CLOSED && useWebSocket) {
			setTimeout(() => {
				webSocketInstance.current = webSocketConnection.getConnectionInstance(url);
			}, 1000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [useWebSocket, webSocketConnection.readyState]);

	function send(message: any) {
		if (webSocketConnection.getReadState() === WebSocket.OPEN) {
			webSocketInstance.current?.send(message);
		} else {
			buffer.current.add(message);
		}
	}

	const value: IWebSocketProvider = {
		send,
		subscribeToOnUpdate,
		unSubscribeToOnUpdate,
	};

	return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
