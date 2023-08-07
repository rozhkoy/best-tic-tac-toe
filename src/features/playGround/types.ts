import { SymbolTypes } from '@/shared/ui/fieldCell/types';

export interface IPlayerData {
	nickname: string;
	score: number;
	userId?: number;
}

export interface IPlayers {
	nought: IPlayerData;
	cross: IPlayerData;
}

export interface GameInfoProps {
	playersData: IPlayers;
	currentMove: ICurrentMove;
	gameStatusMessage: GameStatusMessage;
}

export interface ICurrentMove {
	symbol: SymbolTypes;
	player?: string;
	numberOfMoves: number;
}

export interface GameStatusMessage {
	message: string;
	color: 'red' | 'secondary';
	isShow: boolean;
}

export interface IMoveInfo {
	index?: number;
	score: number;
}

export type WinnerTypes = 'cross' | 'nought' | 'draw' | 'unknown';
