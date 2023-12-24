const webSocketHandler = require('./webSocketHandler');
const url = require('url');
const { Op } = require('sequelize');
const websocketAuthCheck = require('../services/websocketAuthCheck');

const parseCookie = require('../services/parseCookie');
const usersId = new Map();
const sessions = new Map();

const elo = require('../services/elo');

module.exports = (webSocketServer, socket, req) => {
	try {
		const query = url.parse(req.url, true).query;

		if (!query.userId) {
			throw new Error('Error!. Missing required userId');
		}

		// const cookies = parseCookie(req.headers.cookie ?? '');

		// if (!websocketAuthCheck(cookies.firebase_token)) {
		// 	socket.send(JSON.stringify({ event: 'CANT_ACCESS_THE_SERVER', error: "Can't access the server" }));
		// 	socket.close();
		// }

		if (usersId.get(query.userId)) {
			console.log('already');
			socket.send(JSON.stringify({ event: 'APP_IS_ALREADY_OPEN', error: 'Please close the current application window to proceed.' }));
			socket.close();
		}

		usersId.set(query.userId, socket);

		socket.on('message', (message) => {
			console.log(JSON.parse(message));
			webSocketHandler.message({ webSocketServer, socket, usersId, message, req, sessions });
		});

		socket.on('close', async () => {
			webSocketHandler.close({ userId: query.userId, socket, usersId, sessions });
		});
	} catch (e) {
		console.log(e);
	}
};
