export interface IFindAndCount<T> {
	count: number;
	rows: T;
}

export interface IPaginationResponse<T> {
	rows: T;
	nextPage?: number;
}

export type GamestatusTypes = 'won' | 'lost' | 'draw';

export interface IGameHistoryItemResponse {
	userInfo: {
		userId: string;
		nickname: string;
	};
	gameHistoryId: string;
	timestamp: number;
	gameStatus: GamestatusTypes;
}
