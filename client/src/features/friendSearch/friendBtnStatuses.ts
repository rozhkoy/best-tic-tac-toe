import { FrindshipBtnsStatusTypes } from './types';

export const friendBtnStatuses: Record<string, FrindshipBtnsStatusTypes> = {
	INVITED_TO_GAME: 'INVITED_TO_GAME',
	FRIEND: 'FRIEND',
	INVITATION_TO_FRIENDS: 'INVITATION_TO_FRIENDS',
	PENDING: 'PENDING',
	LOADING: 'LOADING',
	ERROR: 'ERROR',
} as const;
