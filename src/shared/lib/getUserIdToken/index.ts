import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const getUserIdToken = () => {
	return new Promise((resolve, reject) => {
		try {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					resolve(await user.getIdToken());
				} else {
					reject(null);
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};
