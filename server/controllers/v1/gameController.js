const { userFriends } = require('../../database/models');
const friendsBtnStatuses = require('../../constants/friendBtnStatuses');
const webSocketStatuses = require('../../constants/webSocketStatuses');
const sendMessage = require('../../services/sendMessage');

class GameController {
	async inviteToGame({ client, usersId, message }) {
		try {
			const { friendId } = message.data;
			const { userId } = message;

			if (!friendId || !userId) {
				throw new Error('Error!. Missing required query parameters');
			}

			const senderInfo = await user.findOne({
				where: {
					user_id: userId,
				},
				attributes: ['nickname', 'user_id'],
			});

			if (!updateStatusResponse) {
				message.event = webSocketStatuses.INTERNEL_SERVER_ERROR;
				message.data = {};
				message.status = webSocketStatuses.ERROR;
				client.send(JSON.stringify(message));
				// throw new Error({ message: 'Error!. There is no information about the user', status: webSocketStatuses.USER_NOT_FOUND });
			}

			message.data.senderInfo = senderInfo;

			const isSuccessfully = sendMessage({ recipient: usersId.get(friendId), message });

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

				message.event = webSocketEventNames.INVITATION_TO_GAME_HAS_BEEN_SENT;
				message.status = webSocketStatuses.SUCCESS;
				message.data = {};
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
					message.event = webSocketStatuses.INTERNEL_SERVER_ERROR;
					message.data = {};
					message.status = webSocketStatuses.ERROR;
					client.send(JSON.stringify(message));
				}

				message.event = webSocketEventNames.USER_IS_NOT_ONLINE;
				message.status = webSocketStatuses.SUCCESS;
			}

			client.send(JSON.stringify(message));
		} catch (e) {
			console.log(e);
			message.data = {};
			message.status = webSocketStatuses.SUCCESS;
			message.event = client.send(JSON.stringify(message));
		}
	}
}

module.exports = new GameController();
