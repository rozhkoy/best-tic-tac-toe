import { useMutation } from '@tanstack/react-query';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getUserInfoByUid, registrationNewUser } from '../api';
import { IGetUserInfoByUid } from '../types';
import { useState } from 'react';
import { createFormData } from '@/shared/lib/CreateFormData';
import { nanoid } from 'nanoid';
import { IFormDataObject } from '@/shared/lib/CreateFormData/types';
import { RegistrationInfoFieldsTypes } from './../types';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { updateUserInfo } from '@/entities/user';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/shared/lib/firebase';
import { updateAuthState } from '@/entities/user/store';

export function useFirebaseAuth(): {
	googleAuth: () => void;
	githubAuth: () => void;
	createAccount: (email: string, password: string, name: string) => void;
	authByEmailAndPassword: (email: string, password: string) => void;
	signOutAccount: () => void;
	getAuthState: () => void;
} {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();

	const [registrationUserInfo, setRegistrationUserInfo] = useState<Record<RegistrationInfoFieldsTypes, string>>({ uid: '', nickname: '', settingsCode: '' });

	const registrationNewUserMutation = useMutation({
		mutationFn: (formData: FormData) => registrationNewUser(formData),
		onSuccess: ({ userResponse: { nickname, userId, rating } }) => {
			dispatch(updateUserInfo({ nickname, userId, rating }));
			navigation('/');
		},
		onError: (res) => console.log(res),
		retry: false,
	});

	const signInMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: ({ nickname, userId, rating }) => {
			dispatch(updateUserInfo({ nickname, userId, rating }));
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
		retry: false,
	});

	const userInfoByUidMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: ({ nickname, userId, rating }) => {
			dispatch(updateUserInfo({ nickname, userId, rating }));
		},
	});

	function googleAuth() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				signInMutation.mutate({ uid: user.uid });
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	function githubAuth() {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				signInMutation.mutate({ uid: user.uid });
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	function createAccount(email: string, password: string, nickname: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				const registrationInfo: Array<IFormDataObject> = [
					{
						key: 'uid',
						value: user.uid,
					},
					{
						key: 'nickname',
						value: nickname,
					},
					{
						key: 'settingsCode',
						value: nanoid(),
					},
				];

				const formData = createFormData(registrationInfo);
				registrationNewUserMutation.mutate(formData);
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	function authByEmailAndPassword(email: string, password: string) {
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				signInMutation.mutate({ uid: user.uid });
			})
			.catch((error) => {
				alert(error.message);
			});
	}

	function signOutAccount() {
		signOut(auth)
			.then(() => {
				console.log('sign out');
			})
			.catch((error) => {
				console.log(error);
				alert('upsss');
			});
	}

	function getAuthState() {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				document.cookie = 'firebase_token=' + (await user.getIdToken());

				dispatch(updateAuthState(true));
				userInfoByUidMutation.mutate({ uid: user.uid });
			}
		});

		return false;
	}

	return { googleAuth, githubAuth, createAccount, signOutAccount, getAuthState, authByEmailAndPassword };
}
