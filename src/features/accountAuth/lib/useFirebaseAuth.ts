import { useMutation, useQuery } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, GoogleAuthProvider, UserInfo, createUserWithEmailAndPassword, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { getUserInfoByUid, registrationNewUser } from '../api';
import { IGetUserInfoByUid, IRegistrationUserInfo } from '../types';
import { useState } from 'react';
import { createFormData } from '@/shared/lib/CreateFormData';

const firebaseConfig = {
	apiKey: 'AIzaSyDsgttm4Wu9CKUujREsyrYP6TXIZh4MU7I',
	authDomain: 'photogallery-823c6.firebaseapp.com',
	projectId: 'photogallery-823c6',
	storageBucket: 'photogallery-823c6.appspot.com',
	messagingSenderId: '551103906843',
	appId: '1:551103906843:web:5de0ae290c6bd0f54a24be',
	measurementId: 'G-1JX1YKRJJT',
};

export function useFirebaseAuth(): {
	googleAuth: () => void;
	githubAuth: () => void;
	createAccount: (email: string, password: string, name: string) => void;
	signOutAccount: () => void;
} {
	const [registrationUserInfo, setRegistrationUserInfo] = useState<IRegistrationUserInfo>({ uid: 'test', nickname: 'test', settingsCode: '2341234' });

	const firebaseApplication = initializeApp(firebaseConfig);
	const auth = getAuth(firebaseApplication);

	const registrationNewUserMutation = useMutation({
		mutationFn: (formData: FormData) => registrationNewUser(formData),
		onSuccess: (res) => console.log(res),
		onError: (res) => console.log(res),
	});

	const userInfoByUidMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: (res) => console.log(res),
		onError: (err) => {
			console.log(err);
			const formData = createFormData([
				{
					key: 'uid',
					value: 'asdfasd',
				},
				{
					key: 'nickname',
					value: 'asdfasd',
				},
				{
					key: 'settingsCode',
					value: 'asdfasd',
				},
			]);
			registrationNewUserMutation.mutate(formData);
		},
	});

	function googleAuth() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				userInfoByUidMutation.mutate({ uid: result.user.uid });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function githubAuth() {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GithubAuthProvider.credentialFromResult(result);
				userInfoByUidMutation.mutate({ uid: result.user.uid });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function createAccount(email: string, password: string, name: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	function signOutAccount() {
		signOut(auth)
			.then(() => {
				console.log('sign out');
			})
			.catch((error) => {
				console.log('upsss');
			});
	}

	return { googleAuth, githubAuth, createAccount, signOutAccount };
}
