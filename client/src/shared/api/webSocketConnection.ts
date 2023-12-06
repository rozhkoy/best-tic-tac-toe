class WebSocketConnection {
	public readyState = 3;
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

	public updateReadyState() {
		this.readyState = this.websocketInstance.readyState;
	}
}

export default new WebSocketConnection();
