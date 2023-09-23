export interface IWebSocketProvider {
	send: (message: any) => void;
	subscribeToOnUpdate: (event: string, callback: (message: any) => void) => () => boolean;
	unSubscribeToOnUpdate: (event: string) => void;
}
