import { ICellData } from '@/shared/ui/fieldCell/types';

import { GameStatusMessage, ICurrentMove, IPlayers } from '../playGround/types';

export interface ISendInviteToFriendship {
	invitationUserId: string;
}

export interface IGetDataAboutOpponent {
	sessionId: string;
}

export interface IReadyStateToGame {
	sessionId: string;
}

export interface IGameboardState {
	currentMove: ICurrentMove;
	playFieldState: Array<ICellData>;
}

export interface ISyncGameboardState {
	friendId: string;
	currentMove: ICurrentMove;
	playFieldState: Array<ICellData>;
	isWinnerFound: boolean;
}

export interface IIfWinnerFind {
	friendId: string;
	players: IPlayers;
	gameStatusMessage: GameStatusMessage;
	countGames: number;
}

export interface IMessageWithFriendId {
	friendId: string;
}

export interface IOnGameOver {
	friendId: string;
}

export interface IMessageOnGameOver {
	friendId: string;
	firstPlayerId: string;
	secondPlayerId: string;
	winnerPlayerId: string;
	sessionId: string;
	factor: number;
}
