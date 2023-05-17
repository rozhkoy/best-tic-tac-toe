import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { ICellData } from 'shared/ui/fieldCell/types';
import { ICurrentMove, IPlayerData } from '../types';

export function useFindWinner(
	initialState: Array<ICellData>,
	playersData: IPlayerData[],
	eventIfFindedWinner: (currentMove: ICurrentMove) => void,
	eventIfDraw: () => void,
	resetEvent: () => void
): {
	currentBoardState: Array<ICellData>;
	setCurrentBoardState: Dispatch<SetStateAction<Array<ICellData>>>;
	isWinner: boolean;
	currentMove: ICurrentMove;
	setCurrentMove: Dispatch<SetStateAction<ICurrentMove>>;
	checkIfWinnerFind: () => void;
	resetState: () => void;
} {
	const [currentBoardState, setCurrentBoardState] = useState<Array<ICellData>>(initialState);
	const [isWinner, setIsWinner] = useState<boolean>(false);
	const [currentMove, setCurrentMove] = useState<ICurrentMove>({
		symbol: 'cross',
		player: playersData[0].nickName,
		numberOfMoves: 0,
	});

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
				if (
					currentBoardState[a].symbol === currentBoardState[b].symbol &&
					currentBoardState[b].symbol === currentBoardState[c].symbol &&
					currentBoardState[c].symbol !== 'empty' &&
					currentBoardState[b].symbol !== 'empty' &&
					currentBoardState[a].symbol !== 'empty'
				) {
					setCurrentBoardState((value) => {
						value[a].highlight = true;
						value[b].highlight = true;
						value[c].highlight = true;
						return value;
					});
					eventIfFindedWinner(currentMove);
					setIsWinner(true);
					return true;
				}
			}
			if (currentMove.numberOfMoves > 8) {
				eventIfDraw();
			}
		}
		return false;
	}

	function autoFill() {
		const cellDataTemplate: ICellData = {
			symbol: 'empty',
			highlight: false,
		};

		let filledBoard: Array<ICellData> = [];
		for (let i = 0; i < 9; i++) {
			filledBoard.push({ ...cellDataTemplate });
		}
		setCurrentBoardState(filledBoard);
	}

	function resetState() {
		autoFill();
		setIsWinner(false);
		setCurrentMove({
			symbol: 'cross',
			player: playersData[0].nickName,
			numberOfMoves: 0,
		});
		resetEvent();
	}

	useEffect(() => {
		autoFill();
	}, []);

	return { currentBoardState, setCurrentBoardState, isWinner, checkIfWinnerFind, resetState, currentMove, setCurrentMove };
}
