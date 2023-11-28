export interface IPlayerSessionInfo {
	userId: string;
	isReady: boolean;
	role: 'cross' | 'nought';
	friendId: string;
	nickname: string;
}

export interface IInfoAboutOpponent {
	players: {
		firstPlayer: IPlayerSessionInfo;
		secondPlayer: IPlayerSessionInfo;
	};
	sessionId: string;
}

export type IPartialPlayerData = 'firstPlayer' | 'secondPlayer';
