export interface IPlayerSessionInfo {
	userId: number;
	isReady: boolean;
	role: 'cross' | 'nought';
	friendId: number;
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
