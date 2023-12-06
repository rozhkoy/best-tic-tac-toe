import { PropsWithChildren } from 'react';

export interface IWebSocketProvider {
	send: (message: any) => void;
	subscribeToOnUpdate: (event: string, callback: (message: any) => void) => () => boolean;
	unSubscribeToOnUpdate: (event: string) => void;
}

export interface WebsoketProviderProps extends PropsWithChildren {
	url: string;
	useWebSocket: boolean;
}
