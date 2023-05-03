import { SymbolTypes } from 'shared/ui/fieldCell/types';

export interface IPlayerData {
	nickName: string;
	score: number;
}

export interface GameInfoProps {
	playersData: Array<IPlayerData>;
	currentMove: ICurrentMove;
	gameStatusMessage: GameStatusMessage;
}

export interface ICurrentMove {
	symbol: SymbolTypes;
	playerIndex: number;
	player: string;
}

export interface GameStatusMessage {
	message: string;
	color: 'red' | 'secondary';
	isShow: boolean;
}

export type WinnerTypes = 'cross' | 'nought' | 'draw' | 'unknown';
