import { UserStatusTypes } from './types';

export const userStatuses: Record<string, UserStatusTypes> = {
	ONLINE: 'ONLINE',
	OFFLINE: 'OFFLINE',
	PLAYING: 'PLAYING',
} as const;
