const { getAuth } = require('firebase-admin/auth');

module.exports = async ({ data }) => {
	try {
		if (data.token) {
			const verifyResponse = await getAuth().verifyIdToken(data.token);
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
