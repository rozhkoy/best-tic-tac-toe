class WebSocketConnection {
	private readyState = 3;
	private websocketInstance!: WebSocket;

	public getConnectionInstance(url: string) {
		if (this.readyState === 3) {
			this.websocketInstance = new WebSocket(url);
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
