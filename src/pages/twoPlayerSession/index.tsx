import { GameInfo } from 'features/playGround/ui/gameInfo';
import { Layout } from 'shared/ui/layout';
import { PlayFiled } from '../../features/playGround/ui/playField/index';
import './styles.scss';
import { Button } from 'shared/ui/button';
import { ICellData } from 'shared/ui/fieldCell/types';
import { useEffect, useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, ICurrentMove, IPlayerData, WinnerTypes } from 'features/playGround/types';

export const TwoPlayerSession = () => {
	const [currentBoardState, setCurrentBoardState] = useState<Array<ICellData>>([]);

	const [playersData, setPlayersData] = useState<Array<IPlayerData>>([
		{ nickName: 'Player 1', score: 0 },
		{ nickName: 'Player 2', score: 0 },
	]);

	const [currentMove, setCurrentMove] = useState<ICurrentMove>({
		symbol: 'cross',
		playerIndex: 0,
		player: playersData[0].nickName,
	});
	const [gameStatusMessage, setGameStatusMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});
	const [numberMoves, setNumberMoves] = useState<number>(0);

	function resetBoardState(quantityCell: number) {
		const cellDataTemplate: ICellData = {
			symbol: 'empty',
			highlight: false,
		};

		let filledBoard: Array<ICellData> = [];

		for (let i = 0; i < quantityCell; i++) {
			filledBoard.push({ ...cellDataTemplate });
		}
		setCurrentMove({
			symbol: 'cross',
			playerIndex: 0,
			player: playersData[0].nickName,
		});
		setCurrentBoardState(filledBoard);
		setNumberMoves(0);
		setGameStatusMessage({
			message: '',
			isShow: false,
			color: 'secondary',
		});
	}

	function markCell(index: number) {
		if (!gameStatusMessage.isShow) {
			const boardState = currentBoardState.slice();
			if (boardState[index].symbol === 'empty') {
				boardState[index].symbol = currentMove.symbol;
				setCurrentBoardState(boardState);
				if (currentMove.symbol === 'cross') {
					setCurrentMove({ symbol: 'nought', player: playersData[1].nickName, playerIndex: 0 });
				} else {
					setCurrentMove({ symbol: 'cross', player: playersData[0].nickName, playerIndex: 1 });
				}
				setNumberMoves((value) => ++value);
				checkIfWinerFound();
			}
		}
	}

	function checkIfWinerFound() {
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
				setPlayersData((value) => {
					value = value.slice();
					value[currentMove.playerIndex].score = ++value[currentMove.playerIndex].score;
					return value;
				});

				if (currentMove.symbol === 'cross') {
					setGameStatusMessage((value) => {
						value.color = 'secondary';
						value.isShow = true;
						value.message = 'The crosses won!';
						return value;
					});
				} else {
					setGameStatusMessage((value) => {
						value.color = 'red';
						value.isShow = true;
						value.message = 'The noughts won!';
						return value;
					});
				}
			} else {
				if (numberMoves === 8) {
					setGameStatusMessage((value) => {
						value.color = 'secondary';
						value.isShow = true;
						value.message = 'Draw!';
						return value;
					});
				}
			}
		}
	}

	useEffect(() => {
		resetBoardState(9);
	}, []);

	return (
		<Layout className="game-session">
			<div className="game-session__container">
				<GameInfo gameStatusMessage={gameStatusMessage} currentMove={currentMove} playersData={playersData} />
				<PlayFiled>
					{currentBoardState.map((item, index) => {
						return <FieldCell key={index + item.symbol} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
					})}
				</PlayFiled>
				<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={() => resetBoardState(9)} icon={'restart'} />
			</div>
		</Layout>
	);
};
