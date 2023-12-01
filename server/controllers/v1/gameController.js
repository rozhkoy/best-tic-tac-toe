const { userFriends, users } = require('../../database/models');
const friendsBtnStatuses = require('../../constants/friendBtnStatuses');
const webSocketStatuses = require('../../constants/webSocketStatuses');
const sendMessage = require('../../services/sendMessage');
const userStatuses = require('../../constants/userStatuses');
const randomstring = require('randomstring');
const sendPrivateMessage = require('../../services/sendPrivateMessage');
const updateUsersRating = require('../../services/updateUsersRating');

class GameController {
	async inviteToGame({ usersId, message }) {
		try {
			const { friendId } = message.data;
			const { userId } = message;

			if (!friendId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			const senderInfo = await users.findOne({
				where: {
					user_id: userId,
				},
				attributes: ['nickname', 'user_id'],
			});

			if (!updateStatusResponse) {
				throw new Error('Error!. Failed to update status');
			}

			message.data.senderInfo = senderInfo;

			const isSuccessfully = sendPrivateMessage(usersId.get(userId), usersId.get(friendId), message);

			if (isSuccessfully) {
				const updateStatusResponse = await userFriends.update(
					{
						status: friendsBtnStatuses.INVITED_TO_GAME,
					},
					{
						where: {
							user_friend_id: response.user_id,
						},
					}
				);

				if (!updateStatusResponse) {
					throw new Error('Error!. Failed to update status');
				}
			} else {
				const updateStatusResponse = await users.update(
					{
						status: friendsBtnStatuses.FRIEND,
					},
					{
						where: {
							user_id: friend_id,
						},
					}
				);

				if (!updateStatusResponse) {
					throw new Error('Error!. Failed to update status');
				}
			}
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	async acceptInviteToGame({ usersId, message, sessions }) {
		try {
			const { friendId } = message.data;
			const { userId } = message;

			if (!friendId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			message.data.sessionId = randomstring.generate();

			const updateStatusFirstUser = await users.update(
				{
					status: userStatuses.PLAYING,
				},
				{
					where: {
						user_id: userId,
					},
				}
			);

			if (!updateStatusFirstUser) {
				throw new Error('Error!. Failed to update user status');
			}

			const updateStatusSecondUser = await users.update(
				{
					status: userStatuses.PLAYING,
				},
				{
					where: {
						user_id: friendId,
					},
				}
			);

			if (!updateStatusSecondUser) {
				throw new Error('Error!. Failed to update user status');
			}

			const updateFirstFriendshipRecordResponse = await userFriends.updates(
				{
					status: friendsBtnStatuses.FRIEND,
				},
				{
					where: {
						user_id: userId,
					},
				}
			);

			if (!updateFirstFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update status');
			}

			const updateSecondFriendshipRecordResponse = await userFriends.update(
				{
					status: friendsBtnStatuses.FRIEND,
				},
				{
					where: {
						user_id: friendId,
					},
				}
			);

			if (!updateSecondFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update status');
			}

			const firstPlayerInfo = await users.findOne({
				where: {
					user_id: userId,
				},
				attributes: ['nickname', 'user_id'],
			});

			if (!firstPlayerInfo) {
				throw new Error('Error!. Failed to get user info');
			}

			const secondPlayerInfo = await users.findOne({
				where: {
					user_id: friendId,
				},
				attributes: ['nickname', 'user_id'],
			});

			if (!secondPlayerInfo) {
				throw new Error('Error!. Failed to get user info');
			}

			let sessionData = {
				players: {
					firstPlayer: {
						userId: userId,
						isReady: false,
						role: 'cross',
						friendId: friendId,
						nickname: firstPlayerInfo.nickname,
					},
					secondPlayer: {
						userId: friendId,
						isReady: false,
						role: 'nought',
						friendId: message.userId,
						nickname: secondPlayerInfo.nickname,
					},
				},
				sessionId: message.data.sessionId,
			};

			sessions.set(sessionData.sessionId, sessionData);

			sendPrivateMessage(usersId.get(userId), usersId.get(friendId), message);
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	async rejectInviteToGame({ message, usersId }) {
		try {
			const { friendId } = message.data;
			const { userId } = message;

			if (!friendId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			const updateFirstFriendshipRecordResponse = await userFriends.updates(
				{
					status: friendsBtnStatuses.FRIEND,
				},
				{
					where: {
						user_id: userId,
					},
				}
			);

			if (!updateFirstFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update status');
			}

			const updateSecondFriendshipRecordResponse = await userFriends.update(
				{
					status: friendsBtnStatuses.FRIEND,
				},
				{
					where: {
						user_id: friendId,
					},
				}
			);

			if (!updateSecondFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update status');
			}

			sendPrivateMessage(usersId.get(userId), usersId.get(friendId), message);
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	getDataAboutOpponent({ message, sessions }) {
		try {
			const { sessionId } = message.data;
			const { userId } = message;

			if (!sessionId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			const sessionData = sessions.get(sessionId);

			if (!sessionData) {
				message.data = {};
				message.error = 'Session is closed';
				message.event = websocketEventNames.SESSIONS_IS_CLOSED;
			} else {
				message.data = sessionData;
			}

			sendMessage(usersId.get(userId), message);
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	syncState({ message, usersId }) {
		try {
			const { friendId } = message.data;
			const { userId } = message;

			if (!sessionId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			sendPrivateMessage(usersId.get(userId), usersId.get(friendId), message);
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	handleReadyState({ message, sessions, usersId }) {
		try {
			const { sessionId } = message.data;
			const { userId } = message;

			if (!sessionId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			const currentSession = sessions.get(sessionId);

			for (const key in currentSession.players) {
				let player = currentSession.players[key];
				if (player.userId === message.userId) {
					player.isReady = true;
					message.event = webSocketEventNames.START_GAME;
					message.data = {};

					if (player.isReady) {
						let isSuccessfully;
						if (player.friendId.role === 'cross') {
							isSuccessfully = sendMessageToUser({ client: usersId.get(player.friendId), message });
						} else {
							isSuccessfully = sendMessageToUser({ client: usersId.get(userId), message });
						}

						if (!isSuccessfully) {
							message.event = webSocketEventNames.ERROR;
							message.data = {};
							isSuccessfully = sendMessageToUser({ client: usersId.get(userId), message });
						}
					}
				}
			}
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}

	async onGameOver({ message, usersId, sessions }) {
		try {
			const { friendId, firstPlayerId, secondPlayerId, winnerPlayerId, sessionId, factor } = message.data;
			const { userId } = message;

			if (!firstPlayerId || !secondPlayerId || !winnerPlayerId || !sessionId || !factor || !userId || !friendId) {
				throw new Error('Error!. Missing required query parameters');
			}

			updateUsersRating({ firstPlayerId, secondPlayerId, winnerPlayerId, sessionId, factor, sessions });

			const updateFirstPlayerStatusResponse = await users.update(
				{
					rating: newFirstPlayerRating,
				},
				{
					where: {
						user_id: firstPlayerId,
					},
				}
			);

			if (!updateFirstPlayerStatusResponse) {
				throw new Error('Error!. Faild to update user status');
			}

			const updateSecondPlayerStatusResponse = await users.update(
				{
					rating: newSecondPlayerRating,
				},
				{
					where: {
						user_id: secondPlayerId,
					},
				}
			);

			if (!updateSecondPlayerStatusResponse) {
				throw new Error('Error!. Faild to update user status');
			}

			sendPrivateMessage(usersId.get(userId), usersId.get(friendId), message);
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.ERROR;
			message.event = webSocketEventNames.INTERNEL_SERVER_ERROR;
			sendMessage(usersId.get(userId), message);
		}
	}
}

module.exports = new GameController();
