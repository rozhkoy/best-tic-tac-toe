import { useState, Dispatch, SetStateAction } from 'react';
import { ICellData } from 'shared/ui/fieldCell/types';

function useGameFieldHandler(boardState: Array<ICellData>, setBoardState: Dispatch<SetStateAction<Array<ICellData>>>) {
	const [currentBoardState, setCurrentBoardState] = useState<Array<ICellData>>(boardState);

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

	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];
		if (currentBoardState[a].symbol === currentBoardState[b].symbol && currentBoardState[b].symbol === currentBoardState[c].symbol && currentBoardState[c].symbol !== 'empty' && currentBoardState[b].symbol !== 'empty' && currentBoardState[a].symbol !== 'empty') {
			currentBoardState[a].highlight = true;
			currentBoardState[b].highlight = true;
			currentBoardState[c].highlight = true;
			return [true, currentBoardState];
		}
	}
	return [false, currentBoardState];
}
