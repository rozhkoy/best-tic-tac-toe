const { users } = require('../database/models');
const webSocketHandler = require('./webSocketHandler');
const url = require('url');
const usersId = new Map();
const sessions = new Map();

module.exports = (webSocketServer, socket, req) => {
	try {
		const { userId } = url.parse(req.url, true).query;

		if (usersId.get(userId)) {
			socket.send(JSON.stringify({ event: 'APP_IS_ALREADY_OPEN', error: 'Please close the current application window to proceed.' }));
			socket.close();
		}

		socket.on('message', (message) => {
			webSocketHandler.message({ webSocketServer, socket, usersId, message, req, sessions, userId });
		});

		socket.on('close', async () => {
			webSocketHandler.close({ userId, socket, usersId, sessions });
		});
	} catch (e) {
		console.log(e);
	}
};
