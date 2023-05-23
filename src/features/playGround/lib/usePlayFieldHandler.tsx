import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { ICellData, SymbolTypes } from '@/shared/ui/fieldCell/types';
import { ICurrentMove, IPlayerData } from '../types';

export function usePlayFieldHandler(
	initialState: Array<ICellData>,
	playersData: IPlayerData[],
	eventIfFindedWinner: (symbol: SymbolTypes) => void,
	eventIfDraw: () => void,
	resetEvent: () => void
): {
	playFieldState: Array<ICellData>;
	setPlayFiledStateState: Dispatch<SetStateAction<Array<ICellData>>>;
	isWinner: boolean;
	currentMove: ICurrentMove;
	setCurrentMove: Dispatch<SetStateAction<ICurrentMove>>;
	checkIfWinnerFind: (playFiledState: ICellData[], symbol: SymbolTypes) => void;
	resetState: () => void;
	markCell: (index: number) => void;
} {
	const [playFieldState, setPlayFiledStateState] = useState<Array<ICellData>>(initialState);
	const [isWinner, setIsWinner] = useState<boolean>(false);
	const [currentMove, setCurrentMove] = useState<ICurrentMove>({
		symbol: 'cross',
		player: playersData[0].nickName,
		numberOfMoves: 0,
	});

	function markCell(index: number) {
		if (isWinner) {
			return;
		}
		const boardState = structuredClone(playFieldState);
		if (boardState[index].symbol === 'empty') {
			boardState[index].symbol = currentMove.symbol;
			setPlayFiledStateState(boardState);
			checkIfWinnerFind(boardState, currentMove.symbol);
			if (currentMove.symbol === 'cross') {
				setCurrentMove(({ ...value }) => {
					value.symbol = 'nought';
					value.player = playersData[1].nickName;
					value.numberOfMoves = ++value.numberOfMoves;
					return value;
				});
			} else {
				setCurrentMove(({ ...value }) => {
					value.symbol = 'cross';
					value.player = playersData[0].nickName;
					value.numberOfMoves = ++value.numberOfMoves;
					return value;
				});
			}
		}
	}

	function checkIfWinnerFind(playFiledState: ICellData[], symbol: SymbolTypes) {
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

		if (playFiledState.length > 0) {
			for (let i = 0; i < winningCombinations.length; i++) {
				const [a, b, c] = winningCombinations[i];
				if (playFiledState[a].symbol === symbol && playFiledState[b].symbol === symbol && playFiledState[c].symbol === symbol) {
					playFiledState[a].highlight = true;
					playFiledState[b].highlight = true;
					playFiledState[c].highlight = true;
					setPlayFiledStateState(playFiledState);
					eventIfFindedWinner(symbol);
					setIsWinner(true);
					return true;
				}
			}
			if (currentMove.numberOfMoves >= 8) {
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
		setPlayFiledStateState(filledBoard);
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

	return { playFieldState, setPlayFiledStateState, isWinner, checkIfWinnerFind, resetState, currentMove, setCurrentMove, markCell };
}
