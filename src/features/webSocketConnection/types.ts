import { ICellData } from '@/shared/ui/fieldCell/types';

import { ICurrentMove, IPlayers } from '../playGround/types';

export interface ISendInviteToFriendship {
	invitationUserId: string;
}

export interface ISendInviteToGame {
	friendId: string;
}

export interface IGetDataAboutOpponent {
	sessionId: string;
}

export interface IReadyStateToGame {
	sessionId: string;
}

export interface IAcceptInviteToGame {
	friendId: string;
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
