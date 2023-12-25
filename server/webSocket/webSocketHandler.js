const { userFriends, users, gameHistories } = require('../database/models');
const gameController = require('../controllers/v1/gameController');
const webSocketEventNames = require('../constants/webSocketEventNames');
const { Op } = require('sequelize');
const friendsBtnStatuses = require('../constants/friendBtnStatuses');
const userStatuses = require('../constants/userStatuses');
const updateUsersRating = require('../services/updateUsersRating');
const sendMessage = require('../services/sendMessage');
const websocketAuthCheck = require('../services/websocketAuthCheck');

class WebSocketHandler {
	async message({ socket, usersId, message, sessions, userId }) {
		message = JSON.parse(message);

		switch (message.event) {
			case webSocketEventNames.AUTH_CHECK:
				try {
					if (!websocketAuthCheck(message) && !userId) {
						socket.send(JSON.stringify({ event: 'CANT_ACCESS_THE_SERVER', error: "Can't access the server" }));
						socket.close();
						return;
					}
					usersId.set(userId, socket);
					socket.send(JSON.stringify(message));
				} catch (e) {
					console.log(e);
				}
				break;
			case webSocketEventNames.INVITE_TO_GAME:
				gameController.inviteToGame({ usersId, message });
				break;
			case webSocketEventNames.INVITE_TO_GAME_IS_ACCEPTED:
				gameController.acceptInviteToGame({ usersId, message, sessions });
				break;
			case webSocketEventNames.INVITE_TO_GAME_IS_REJECTED:
				gameController.rejectInviteToGame({ usersId, message });
				break;
			case webSocketEventNames.SYNC_GAME_STATE:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.SYNC_PLAYGROUND:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.DATA_ABOUT_OPONENT:
				gameController.getDataAboutOpponent({ message, sessions, usersId });
				break;
			case webSocketEventNames.START_GAME:
				gameController.handleReadyState({ usersId, message, sessions });
				break;
			case webSocketEventNames.WINNER_FIND:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.RESET_GAME_STATE:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.GAME_OVER:
				gameController.onGameOver({ usersId, message, sessions });
				break;
			case webSocketEventNames.INVITE_TO_GAME_IS_DECLINE:
				gameController.syncState({ usersId, message });
				break;
		}
	}
	async close({ userId, usersId, sessions, socket }) {
		try {
			if (socket === usersId.get(userId)) usersId.delete(userId);

			const updateUserStatus = await users.update(
				{
					status: userStatuses.OFFLINE,
				},
				{
					where: {
						user_id: userId,
					},
					returning: false,
				}
			);

			if (!updateUserStatus) {
				throw new Error('Error!. Failed to update user status');
			}

			const updateFriendshipStatus = await userFriends.update(
				{
					status: friendsBtnStatuses.FRIEND,
				},
				{
					where: {
						[Op.or]: [{ user_id: userId }, { user_friend_id: userId }],
						status: friendsBtnStatuses.INVITED_TO_GAME,
					},
				}
			);

			if (!updateFriendshipStatus) {
				throw new Error('Error!. Failed to update Friendship status');
			}

			sessions.forEach(async ({ players: { firstPlayer, secondPlayer }, sessionId }, index, map) => {
				if (firstPlayer.userId == userId || secondPlayer.userId == userId) {
					updateUsersRating({
						firstPlayerId: firstPlayer.userId,
						secondPlayerId: secondPlayer.userId,
						winnerPlayerId: firstPlayer.userId == userId ? firstPlayer.friendId : firstPlayer.userId,
						sessionId,
						factor: 2,
						sessions,
					});

					const updateOpponentStatus = await users.update(
						{
							status: userStatuses.ONLINE,
						},
						{
							where: {
								user_id: firstPlayer.userId == userId ? firstPlayer.friendId : firstPlayer.userId,
							},
							returning: false,
						}
					);

					if (!updateOpponentStatus) {
						throw new Error('Error!. Failed to update user status');
					}

					const message = {
						data: {
							winnerPlayerId: firstPlayer.userId == userId ? firstPlayer.friendId : firstPlayer.userId,
						},
						event: webSocketEventNames.GAME_OVER,
					};

					sendMessage(usersId.get(message.data.winnerPlayerId), message);

					return;
				}
			});
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new WebSocketHandler();
