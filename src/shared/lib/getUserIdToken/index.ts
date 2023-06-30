import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const getUserIdToken = new Promise((resolve, rejects) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			resolve(await user.getIdToken());
		} else {
			rejects();
		}
	});
});
