import { ICellData, SymbolTypes } from 'shared/ui/fieldCell/types';
import { IMoveInfo } from '../types';
import { HardLevelTypes } from 'features/gameSelector/types';

export function useMiniMax(hardLevel: HardLevelTypes): { miniMax: (playFieldState: ICellData[], currentSymbol: SymbolTypes, depth: number) => IMoveInfo } {
	function findemptyCellsIndexes(playFieldState: ICellData[]): Array<number> {
		let emptyCellsIndexes: Array<number> = [];
		for (let i = 0; i < playFieldState.length; i++) {
			if (playFieldState[i].symbol === 'empty') {
				emptyCellsIndexes.push(i);
			}
		}
		return emptyCellsIndexes;
	}

	function findWinner(playFieldState: Array<ICellData>, symbol: SymbolTypes): boolean {
		const winningCombinations: Array<number[]> = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[6, 4, 2],
		];

		if (playFieldState.length > 0) {
			for (let i = 0; i < winningCombinations.length; i++) {
				const [a, b, c] = winningCombinations[i];
				if (playFieldState[a].symbol === symbol && playFieldState[b].symbol === symbol && playFieldState[c].symbol === symbol) {
					return true;
				}
			}
		}
		return false;
	}

	function miniMax(playFieldState: ICellData[], currentSymbol: SymbolTypes, depth: number): IMoveInfo {
		const emptyCellsIndexes: Array<number> = findemptyCellsIndexes(playFieldState);

		if (findWinner(playFieldState, 'nought')) {
			return { score: 10 - depth };
		} else if (findWinner(playFieldState, 'cross')) {
			return { score: -10 - depth };
		} else if (emptyCellsIndexes.length === 0) {
			return { score: 0 };
		}

		++depth;
		let moves: Array<IMoveInfo> = [];

		for (let i = 0; i < emptyCellsIndexes.length; i++) {
			let move: IMoveInfo = {
				score: 0,
				index: emptyCellsIndexes[i],
			};
			playFieldState[emptyCellsIndexes[i]].symbol = currentSymbol;
			let gameResult: IMoveInfo = { score: 0 };

			if (currentSymbol === 'cross') {
				gameResult = miniMax(playFieldState, 'nought', depth);
			} else {
				gameResult = miniMax(playFieldState, 'cross', depth);
			}

			move.score = gameResult.score;
			playFieldState[emptyCellsIndexes[i]] = { symbol: 'empty', highlight: false };
			moves.push(move);
		}

		let bestMoveIndex: number = 0;
		moves.sort((a, b) => a.score - b.score);
		if (currentSymbol === 'cross') {
			switch (hardLevel) {
				case 'Easy':
					bestMoveIndex = moves.length - 1;
					break;
				case 'Normal':
					bestMoveIndex = Math.floor(moves.length / 2);
					break;
				case 'Hard':
					bestMoveIndex = 0;
			}
		} else {
			switch (hardLevel) {
				case 'Easy':
					bestMoveIndex = 0;
					break;
				case 'Normal':
					bestMoveIndex = Math.floor(moves.length / 2);
					break;
				case 'Hard':
					bestMoveIndex = moves.length - 1;
			}
		}
		return moves[bestMoveIndex];
	}
	return {
		miniMax,
	};
}
