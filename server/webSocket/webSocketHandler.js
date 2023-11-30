const { user } = require('../database/model');
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const webSocketEventNames = require('./websocketEventNames');
const websocketEventNames = require('./websocketEventNames');

class WebSocketHandler {
	async message(webSocketServer, client, usersId, message, req, sessions) {
		message = JSON.parse(message);

		switch (message.event) {
		}
	}
}

module.exports = new WebSocketHandler();
