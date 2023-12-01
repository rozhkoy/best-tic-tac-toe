const { getAuth } = require('firebase-admin/auth');

module.exports = async (token) => {
	try {
		if (token) {
			const verifyResponse = await getAuth().verifyIdToken(token);
			if (verifyResponse) {
				return true;
			}
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
	}
};
