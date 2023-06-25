import axios from 'axios';
import { error } from 'console';

export const server = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:5000',
});

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status !== 200) {
			return Promise.reject(error);
		}
	}
);
