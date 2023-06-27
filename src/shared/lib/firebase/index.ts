import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
