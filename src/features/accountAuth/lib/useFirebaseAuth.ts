import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDsgttm4Wu9CKUujREsyrYP6TXIZh4MU7I',
	authDomain: 'photogallery-823c6.firebaseapp.com',
	projectId: 'photogallery-823c6',
	storageBucket: 'photogallery-823c6.appspot.com',
	messagingSenderId: '551103906843',
	appId: '1:551103906843:web:5de0ae290c6bd0f54a24be',
	measurementId: 'G-1JX1YKRJJT',
};

export function useFirebaseAuth(eventAfterAuth: () => void): { googleAuth: () => void; facebookAuth: () => void; createAccount: (email: string, password: string, name: string) => void } {
	const firebaseApplication = initializeApp(firebaseConfig);
	const auth = getAuth(firebaseApplication);

	function googleAuth() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				console.log(credential, result.user);
				eventAfterAuth();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	function facebookAuth() {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = FacebookAuthProvider.credentialFromResult(result);
				console.log(credential, result.user);
				eventAfterAuth();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential = FacebookAuthProvider.credentialFromError(error);
			});
	}

	function createAccount(email: string, password: string, name: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {})
			.catch((error) => {
				console.log(error.message);
			});
	}

	return { googleAuth, facebookAuth, createAccount };
}
