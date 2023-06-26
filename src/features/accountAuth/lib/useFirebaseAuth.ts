import { useMutation, useQuery } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, GoogleAuthProvider, UserInfo, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getUserInfoByUid, registrationNewUser } from '../api';
import { IGetUserInfoByUid } from '../types';
import { useState, Dispatch } from 'react';
import { createFormData } from '@/shared/lib/CreateFormData';
import { nanoid } from 'nanoid';
import { IFormDataObject } from '@/shared/lib/CreateFormData/types';
import { RegistrationInfoFieldsTypes } from './../types';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { updateUserInfo } from '@/entities/user';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
	apiKey: 'AIzaSyDsgttm4Wu9CKUujREsyrYP6TXIZh4MU7I',
	authDomain: 'photogallery-823c6.firebaseapp.com',
	projectId: 'photogallery-823c6',
	storageBucket: 'photogallery-823c6.appspot.com',
	messagingSenderId: '551103906843',
	appId: '1:551103906843:web:5de0ae290c6bd0f54a24be',
	measurementId: 'G-1JX1YKRJJT',
};

const firebaseApplication = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApplication);

export function useFirebaseAuth(): {
	googleAuth: () => void;
	githubAuth: () => void;
	createAccount: (email: string, password: string, name: string) => void;
	signOutAccount: () => void;
} {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const [registrationUserInfo, setRegistrationUserInfo] = useState<Record<RegistrationInfoFieldsTypes, string>>({ uid: '', nickname: '', settingsCode: '' });
	const registrationNewUserMutation = useMutation({
		mutationFn: (formData: FormData) => registrationNewUser(formData),
		onSuccess: ({ userResponse: { nickname, userId, rating } }) => {
			dispatch(updateUserInfo({ nickname, userId, rating, isAuth: true }));
			navigation('/');
		},
		onError: (res) => console.log(res),
	});

	const userInfoByUidMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: ({ nickname, userId, rating }) => {
			dispatch(updateUserInfo({ nickname, userId, rating, isAuth: true }));
			navigation('/');
		},
		onError: (err) => {
			const registrationInfo: Array<IFormDataObject> = [];
			for (const item of Object.keys(registrationUserInfo)) {
				registrationInfo.push({
					key: item,
					value: registrationUserInfo[item as RegistrationInfoFieldsTypes],
				});
			}
			console.log(registrationInfo);
			const formData = createFormData(registrationInfo);
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
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				userInfoByUidMutation.mutate({ uid: user.uid });
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
