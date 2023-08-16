export interface IWebSocketProvider {
	instance: WebSocket;
	subscribeToOnUpdate: (event: string, callback: (message: any) => void) => () => boolean;
	unSubscribeToOnUpdate: (event: string) => void;
}
