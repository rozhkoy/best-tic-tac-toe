import { ICellData } from '@/shared/ui/fieldCell/types';

import { GameStatusMessage, ICurrentMove, IPlayers } from '../playGround/types';
import { IPaginationInfo } from '../friendSearch/types';

export interface ISendInviteToFriendship {
	invitationUserId: string;
}

export interface ISendInviteToGame {
	friendId: number;
	paginationInfo: IPaginationInfo;
}

export interface IGetDataAboutOpponent {
	sessionId: string;
}

export interface IReadyStateToGame {
	sessionId: string;
}

export interface IAcceptInviteToGame {
	friendId: number;
}

export interface IGameboardState {
	currentMove: ICurrentMove;
	playFieldState: Array<ICellData>;
}

export interface ISyncGameboardState {
	friendId: number;
	currentMove: ICurrentMove;
	playFieldState: Array<ICellData>;
}

export interface IIfWinnerFind {
	friendId: number;
	players: IPlayers;
	gameStatusMessage: GameStatusMessage;
	countGames: number;
}

export interface IMessageWithFriendId {
	friendId: number;
}

export interface IOnGameOver {
	friendId: number;
}

export interface IMessageOnGameOver {
	friendId: number;
	firstPlayerId: number;
	secondPlayerId: number;
	winnerPlayerId: number;
}
