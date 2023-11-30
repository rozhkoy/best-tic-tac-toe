const webSocketHandler = require('./webSocketHandler');
const url = require('url');
const { Op } = require('sequelize');
const { user, userFriend, gameHistory } = require('../database/model');
const parseCookie = require('../services/parseCookie');
const usersId = new Map();
const sessions = new Map();
// const websocketAuthCheck = require('../services/websocketAuthCheck');
const sendMessageToUser = require('../services/sendMessage');
const websocketEventNames = require('./websocketEventNames');
const elo = require('../services/elo');

module.exports = (webSocketServer, socket, req) => {
	const query = url.parse(req.url, true).query;
	console.log(req.params);
	// const cookies = parseCookie(req.headers.cookie);

	// if (!websocketAuthCheck(cookies.firebase_token)) {
	// 	socket.send({ event: 'CANT_ACCESS_THE_SERVER', error: "Can't access the server" });
	// 	socket.close();
	// }

	socket.on('message', (message) => {
		webSocketHandler.message(webSocketServer, socket, usersId, message, req, sessions);
	});

	usersId.set(String(query.userId), socket);

	socket.on('close', async () => {
		const updateResponse = await user.update(
			{
				status: 'offline',
			},
			{
				where: {
					userId: query.userId,
				},
			}
		);

		const updateFriendsStatus = await userFriend.update(
			{
				status: 'friend',
			},
			{
				where: {
					[Op.or]: [{ userId: query.userId }, { friendUserId: query.userId }],
					status: 'invitedToGame',
				},
			}
		);

		usersId.delete(query.userId);

		// sessions.forEach(async ({ players: { firstPlayer, secondPlayer }, sessionId }, index, map) => {
		// 	if (firstPlayer.userId == query.userId || secondPlayer.userId == query.userId) {
		// 		console.log('========================', firstPlayer.userId, query.userId);
		// 		const response = await gameHistory.create({
		// 			firstPlayerId: firstPlayer.userId,
		// 			secondPlayerId: secondPlayer.userId,
		// 			winnerPlayerId: firstPlayer.userId == query.userId ? firstPlayer.friendId : firstPlayer.userId,
		// 			timestamp: Date.now(),
		// 		});

		// 		const firstPlayerInfo = await user.findOne({
		// 			where: {
		// 				userId: firstPlayer.userId,
		// 			},
		// 			attributes: ['rating', 'userId'],
		// 		});

		// 		const secondPlayerInfo = await user.findOne({
		// 			where: {
		// 				userId: secondPlayer.userId,
		// 			},
		// 			attributes: ['rating', 'userId'],
		// 		});

		// 		const newFirstPlayerRating = elo(firstPlayerInfo.rating, secondPlayerInfo.rating, response.winnerPlayerId == 0 ? 0.5 : response.winnerPlayerId == firstPlayer.userId ? 1 : 0, 2);

		// 		const newSecondPlayerRating = elo(secondPlayerInfo.rating, firstPlayerInfo.rating, response.winnerPlayerId == 0 ? 0.5 : response.winnerPlayerId == secondPlayer.userId ? 1 : 0, 2);

		// 		const updateFirstPlayerRatingResponse = await user.update(
		// 			{
		// 				rating: newFirstPlayerRating,
		// 			},
		// 			{
		// 				where: {
		// 					userId: firstPlayer.userId,
		// 				},
		// 			}
		// 		);

		// 		const updateSecondPlayerRatingResponse = await user.update(
		// 			{
		// 				rating: newSecondPlayerRating,
		// 			},
		// 			{
		// 				where: {
		// 					userId: secondPlayer.userId,
		// 				},
		// 			}
		// 		);

		// 		const message = {
		// 			data: {
		// 				winnerPlayerId: response.winnerPlayerId,
		// 			},
		// 			event: websocketEventNames.GAME_OVER,
		// 		};
		// 		console.log('=====================================', message);

		// 		sendMessageToUser({ client: usersId.get(message.data.winnerPlayerId), message });

		// 		sessions.delete(sessionId);
		// 		return;
		// 	}
		// });
		// console.log(updateResponse, updateFriendsStatus);
	});
};
