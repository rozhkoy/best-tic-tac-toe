class WebSocketConnection {
	private readyState = 3;
	private WEBSOCKET_ULR = 'ws:localhost:5000';
	private websocketInstance!: WebSocket;

	public getConnectionInstance() {
		if (this.readyState === 3) {
			this.websocketInstance = new WebSocket(this.WEBSOCKET_ULR);
			this.readyState = 0;
			return this.websocketInstance;
		}
		return this.websocketInstance;
	}

	public setReadyState(readyStateCode: number) {
		this.readyState = readyStateCode;
	}

	public getReadState() {
		return this.readyState;
	}
}

export default new WebSocketConnection();
