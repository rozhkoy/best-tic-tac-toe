export interface IWebSocketMessage<T> {
	event: string;
	userId: string;
	data: T;
	error?: string;
}
