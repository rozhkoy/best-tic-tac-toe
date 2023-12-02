const sendMessage = require('./sendMessage');
const webSocketStatuses = require('../constants/webSocketEventNames');

module.exports = (sender, recipient, message, onSuccessEventName) => {
	const isSuccessfullySendToRecipient = sendMessage(recipient, message);
	if (!isSuccessfullySendToRecipient) {
		message.event = webSocketStatuses.USER_IS_NOT_ONLINE;
		message.data = {};
		return sendMessage(sender, message) && isSuccessfullySendToRecipient;
	} else {
		message.event = onSuccessEventName ?? message.event;
		return sendMessage(sender, message) && isSuccessfullySendToRecipient;
	}
};
