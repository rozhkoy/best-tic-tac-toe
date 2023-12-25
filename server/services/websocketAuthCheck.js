const { getAuth } = require('firebase-admin/auth');
const { users } = require('../database/models');
const userStatuses = require('../constants/userStatuses');

module.exports = async ({ data, userId }) => {
	try {
		if (data.token) {
			const verifyResponse = await getAuth().verifyIdToken(data.token);
			if (verifyResponse) {
				const upateUserStatusResponse = await users.update({ status: userStatuses.ONLINE }, { where: { user_id: userId } });

				if (!upateUserStatusResponse) {
					throw new Error('Error!. Failed to update user status');
				}

				return true;
			}
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};
