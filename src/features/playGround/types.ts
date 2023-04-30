import { SymbolTypes } from 'shared/ui/fieldCell/types';

export interface IPlayerData {
	nickName: string;
	score: number;
}

export interface GameInfoProps {
	playersData: Array<IPlayerData>;
	currentMove: ICurrentMove;
}

export interface ICurrentMove {
	symbol: SymbolTypes;
	playerIndex: number;
	player: string;
}
