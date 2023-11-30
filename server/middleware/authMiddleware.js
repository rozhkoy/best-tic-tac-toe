const { getAuth } = require('firebase-admin/auth');

module.exports = async (req, res, next) => {
	const authorizationHeader = req.headers.authorization;
	if (authorizationHeader) {
		const verifyResponse = await getAuth().verifyIdToken(authorizationHeader);
		if (verifyResponse) {
			next();
		}
	} else {
		return res.status(401).send('Access denied');
	}
};
