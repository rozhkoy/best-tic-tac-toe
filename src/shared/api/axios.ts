import axios from 'axios';
import { Console, error } from 'console';
import { config } from 'process';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { resolve } from 'path';
import { rejects } from 'assert';

export const server = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:5000',
});

const userIdToken = new Promise((resolve, rejects) => {
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			resolve(await user.getIdToken());
		} else {
			rejects();
		}
	});
});

server.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status !== 200) {
			return Promise.reject(error);
		}
	}
);

server.interceptors.request.use(async (config) => {
	const idToken = await userIdToken;
	if (config.headers && idToken) {
		config.headers.Authorization = String(idToken);
	}
	return config;
});
