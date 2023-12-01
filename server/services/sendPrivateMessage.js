const sendMessage = require('./sendMessage');
const webSocketStatuses = require('../constants/websocketEventNames');

module.export = function sendPrivateMessage(sender, recipient, message) {
	const isSuccessfullySendToRecipient = sendMessage(recipient, message);
	if (!isSuccessfullySendToRecipient) {
		message.event = webSocketStatuses.USER_IS_NOT_ONLINE;
		message.data = {};
		return sendMessage(sender, message) && isSuccessfullySendToRecipient;
	} else {
		return sendMessage(sender, message) && isSuccessfullySendToRecipient;
	}
};
