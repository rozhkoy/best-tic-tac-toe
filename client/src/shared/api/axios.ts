import axios from 'axios';
import { getUserIdToken } from '../lib/getUserIdToken';

export const server = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BASE_URL,
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
	try {
		const idToken = await getUserIdToken();
		if (config.headers && idToken) {
			config.headers.Authorization = String(idToken);
		}
	} catch (e) {
		console.log(e);
	}
	return config;
});
