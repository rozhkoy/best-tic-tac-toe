import { GameBoardWrap, GameInfo, PlayField, useFindWinner } from 'features/playGround';
import { useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IMoveInfo, IPlayerData } from 'features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from 'shared/ui/button';
import { SymbolTypes } from 'shared/ui/fieldCell/types';
import { ICellData } from 'shared/ui/fieldCell/types';

export const WithBotSession = () => {
	const [playersData, setPlayersData] = useState<Array<IPlayerData>>([
		{ nickName: 'Player', score: 0 },
		{ nickName: 'Bot', score: 0 },
	]);
	const { currentBoardState, isWinner, checkIfWinnerFind, setCurrentBoardState, currentMove, resetState, setCurrentMove } = useFindWinner(
		[],
		playersData,
		() => {
			console.log('won');
		},
		() => {
			console.log('draw');
		},
		() => {
			console.log('reset');
		}
	);

	const [gameStatusMessage, setGameStatusMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});

	function markCell(index: number) {
		console.log(findEmptyCell());
		if (!isWinner) {
			const boardState = currentBoardState.slice();
			if (boardState[index].symbol === 'empty') {
				boardState[index].symbol = currentMove.symbol;
				checkIfWinnerFind();
				if (currentMove.symbol === 'cross') {
					const result = minMax(boardState.slice(), 'nought', index);
					boardState[result.index].symbol = 'nought';
				} else {
					setCurrentMove(({ ...value }) => {
						value.symbol = 'cross';
						value.player = playersData[0].nickName;
						value.numberOfMoves = ++value.numberOfMoves;
						return value;
					});
				}
				setCurrentBoardState(boardState);
			}
		}
	}

	function findEmptyCell(): Array<number> {
		const emptyCell: Array<number> = [];
		for (let i = 0; i < currentBoardState.length; i++) {
			if (currentBoardState[i].symbol === 'empty') {
				emptyCell.push(i);
			}
		}
		return emptyCell;
	}

	function findWinner(boardState: Array<ICellData>, symbol: SymbolTypes): boolean {
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
		if (boardState.length > 0) {
			for (let i = 0; i < winningCombinations.length; i++) {
				const [a, b, c] = winningCombinations[i];
				if (boardState[a].symbol === symbol && boardState[b].symbol === symbol && boardState[c].symbol === symbol) {
					return true;
				}
			}
		}
		return false;
	}

	function minMax(boardState: ICellData[], currentMark: SymbolTypes, index: number): IMoveInfo {
		const emptyCell: Array<number> = findEmptyCell();
		const newBoardState = boardState.slice();

		if (findWinner(newBoardState, 'nought')) {
			return { score: 10, index };
		} else if (findWinner(newBoardState, 'cross')) {
			return { score: -10, index };
		} else if (emptyCell.length === 0) {
			return { score: 0, index };
		}

		const moves: Array<IMoveInfo> = [];

		for (let i = 0; i < emptyCell.length; i++) {
			let move: IMoveInfo = {
				score: 0,
				index: emptyCell[i],
			};
			newBoardState[emptyCell[i]].symbol = currentMark;

			if (currentMark === 'cross') {
				let gameResult = minMax(newBoardState, 'nought', emptyCell[i]);
				move.score = gameResult.score;
			} else {
				let gameResult = minMax(newBoardState, 'cross', emptyCell[i]);
				move.score = gameResult.score;
			}
			// newBoardState[emptyCell[i]] = { symbol: 'empty', highlight: false };
			moves.push(move);
		}

		let bestMove: number = 0;
		if (currentMark === 'nought') {
			let bestScore = +Infinity;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestMove = i;
					bestScore = moves[i].score;
				}
			}
		} else {
			let bestScore = -Infinity;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestMove = i;
					bestScore = moves[i].score;
				}
			}
		}
		return moves[bestMove];
	}

	return (
		<GameBoardWrap>
			<GameInfo playersData={playersData} currentMove={currentMove} gameStatusMessage={gameStatusMessage} />
			<PlayField>
				{currentBoardState.map((item, index) => {
					return <FieldCell key={nanoid()} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
			<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={resetState} icon={'restart'} />
		</GameBoardWrap>
	);
};
