const { userFriends, users } = require('../database/models');
const gameController = require('../controllers/v1/gameController');
const { Op } = require('sequelize');

class WebSocketHandler {
	async message({ webSocketServer, client, usersId, message, req, sessions }) {
		message = JSON.parse(message);

		switch (message.event) {
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
			case websocketEventNames.DATA_ABOUT_OPONENT:
				gameController.getDataAboutOpponent({ message, sessions });
				break;
			case websocketEventNames.START_GAME:
				gameController.handleReadyState({ usersId, message, sessions });
				break;
			case websocketEventNames.WINNER_FIND:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.RESET_GAME_STATE:
				gameController.syncState({ usersId, message });
				break;
			case webSocketEventNames.GAME_OVER:
				gameController.onGameOver({ usersId, message, sessions });
				break;
		}
	}
	async close({ userId, usersId, sessions }) {
		try {
			usersId.delete(userId);

			const updateUserStatus = await users.update(
				{
					status: 'offline',
				},
				{
					where: {
						user_id: userId,
					},
				}
			);

			if (!updateUserStatus) {
				throw new Error('Error!. Failed to update user status');
			}

			const updateFriendshipStatus = await userFriends.update(
				{
					status: 'friend',
				},
				{
					where: {
						[Op.or]: [{ user_id: userId }, { friend_user_id: userId }],
						status: 'invitedToGame',
					},
				}
			);

			if (!updateFriendshipStatus) {
				throw new Error('Error!. Failed to update Friendship status');
			}

			sessions.forEach(async ({ players: { firstPlayer, secondPlayer }, sessionId }, index, map) => {
				if (firstPlayer.userId == userId || secondPlayer.userId == userId) {
					const response = await gameHistory.create({
						firstPlayerId: firstPlayer.userId,
						secondPlayerId: secondPlayer.userId,
						winnerPlayerId: firstPlayer.userId == userId ? firstPlayer.friendId : firstPlayer.userId,
						timestamp: Date.now(),
					});

					updateUsersRating({ firstPlayerId: firstPlayer.userId, secondPlayerId: secondPlayer.userId, winnerPlayerId: response.winnerPlayerId, sessionId, factor: 2, sessions });

					const message = {
						data: {
							winnerPlayerId: response.winnerPlayerId,
						},
						event: websocketEventNames.GAME_OVER,
					};

					sendMessageToUser({ client: usersId.get(message.data.winnerPlayerId), message });

					return;
				}
			});
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new WebSocketHandler();
