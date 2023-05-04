import { useState, Dispatch, SetStateAction } from 'react';
import { ICellData } from 'shared/ui/fieldCell/types';

export function useFindWinner(initialState: Array<ICellData>, eventIfFindedWiner: () => void): { currentBoardState: Array<ICellData>; setCurrentBoardState: Dispatch<SetStateAction<Array<ICellData>>>; isWinner: boolean; checkIfWinnerFind: () => void; resetState: (filledBoard: ICellData[]) => void } {
	const [currentBoardState, setCurrentBoardState] = useState<Array<ICellData>>(initialState);
	const [isWinner, setIsWinner] = useState<boolean>(false);

	function checkIfWinnerFind() {
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
		if (currentBoardState.length > 0) {
			for (let i = 0; i < winningCombinations.length; i++) {
				const [a, b, c] = winningCombinations[i];
				if (currentBoardState[a].symbol === currentBoardState[b].symbol && currentBoardState[b].symbol === currentBoardState[c].symbol && currentBoardState[c].symbol !== 'empty' && currentBoardState[b].symbol !== 'empty' && currentBoardState[a].symbol !== 'empty') {
					setCurrentBoardState((value) => {
						value[a].highlight = true;
						value[b].highlight = true;
						value[c].highlight = true;
						return value;
					});
					setIsWinner(true);
					eventIfFindedWiner();
					return true;
				}
			}
		}
		return false;
	}

	function resetState(filledBoard: Array<ICellData>) {
		setCurrentBoardState(filledBoard);
		setIsWinner(false);
	}

	return { currentBoardState, setCurrentBoardState, isWinner, checkIfWinnerFind, resetState };
}
