module.export = function ({ recipient, message }) {
	try {
		if (recipient) {
			recipient.send(JSON.stringify(message));
			return true;
		}
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
};
