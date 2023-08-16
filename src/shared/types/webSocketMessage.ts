export interface IWebSocketMessage<T> {
	event: string;
	userId: number;
	data: T;
}
