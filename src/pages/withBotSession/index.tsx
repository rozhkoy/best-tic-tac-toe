import { GameBoardWrap, GameInfo, PlayField, useFindWinner } from 'features/playGround';
import { useEffect, useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IMoveInfo, IPlayerData } from 'features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from 'shared/ui/button';
import { SymbolTypes } from 'shared/ui/fieldCell/types';
import { ICellData } from 'shared/ui/fieldCell/types';
import { useParams } from 'react-router-dom';
import { move } from 'formik';

export const WithBotSession = () => {
	const params = useParams();
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
		if (!isWinner) {
			const boardState: ICellData[] = structuredClone(currentBoardState);
			if (boardState[index].symbol === 'empty') {
				boardState[index].symbol = 'cross';
				console.log(boardState);
				const result = minMax(boardState, 'nought', 0);
				console.log(result);
				if (result.index) {
					boardState[result.index].symbol = 'nought';
				}
				setCurrentBoardState(boardState);
			}
		}
	}

	function findEmptyCell(boardState: ICellData[]): Array<number> {
		const emptyCell: Array<number> = [];
		for (let i = 0; i < boardState.length; i++) {
			if (boardState[i].symbol === 'empty') {
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

	function minMax(boardState: ICellData[], currentMark: SymbolTypes, depth: number): IMoveInfo {
		const newBoardState = boardState;

		const emptyCell: Array<number> = findEmptyCell(newBoardState);
		if (findWinner(newBoardState, 'nought')) {
			return { score: 10 - depth };
		} else if (findWinner(newBoardState, 'cross')) {
			return { score: -10 - depth };
		} else if (emptyCell.length === 0) {
			return { score: 0 };
		}
		++depth;
		let moves: Array<IMoveInfo> = [];

		for (let i = 0; i < emptyCell.length; i++) {
			let move: IMoveInfo = {
				score: 0,
				index: emptyCell[i],
			};
			newBoardState[emptyCell[i]].symbol = currentMark;

			if (currentMark === 'cross') {
				let gameResult = minMax(newBoardState, 'nought', depth);
				move.score = gameResult.score;
			} else {
				let gameResult = minMax(newBoardState, 'cross', depth);
				move.score = gameResult.score;
			}
			newBoardState[emptyCell[i]] = { symbol: 'empty', highlight: false };
			moves.push(move);
		}

		let bestMove: number = 0;
		moves = moves.sort((a, b) => a.score - b.score);
		if (currentMark === 'cross') {
			switch (params.hardlevel) {
				case 'easy':
					bestMove = moves.length - 1;
					break;
				case 'normal':
					bestMove = Math.floor(moves.length / 2);
					break;
				case 'hard':
					bestMove = 0;
			}
		} else {
			switch (params.hardlevel) {
				case 'easy':
					bestMove = 0;
					break;
				case 'normal':
					bestMove = Math.floor(moves.length / 2);
					break;
				case 'hard':
					bestMove = moves.length - 1;
			}
		}
		return moves[bestMove];
	}

	useEffect(() => {
		checkIfWinnerFind();
	}, [currentBoardState]);

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
