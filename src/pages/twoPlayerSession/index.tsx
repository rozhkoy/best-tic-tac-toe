import './styles.scss';
import { Button } from 'shared/ui/button';
import { useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IPlayerData } from 'features/playGround/types';
import { GameBoardWrap, GameInfo, PlayField, useFindWinner } from 'features/playGround';
import { nanoid } from 'nanoid';

export const TwoPlayerSession = () => {
	const [playersData, setPlayersData] = useState<Array<IPlayerData>>([
		{ nickName: 'Player 1', score: 0 },
		{ nickName: 'Player 2', score: 0 },
	]);
	const { currentBoardState, setCurrentBoardState, isWinner, checkIfWinnerFind, resetState, currentMove, setCurrentMove } = useFindWinner(
		[],
		playersData,
		(currentMove) => {
			switch (currentMove.symbol) {
				case 'cross':
					setGameStatusMessage(({ ...value }) => {
						value.color = 'secondary';
						value.isShow = true;
						value.message = 'The crosses won!';
						return value;
					});
					break;
				case 'nought':
					setGameStatusMessage(({ ...value }) => {
						value.color = 'red';
						value.isShow = true;
						value.message = 'The noughts won!';
						return value;
					});
					break;
			}
		},
		() => {
			setGameStatusMessage({
				message: 'Draw!',
				isShow: true,
				color: 'secondary',
			});
		},
		() => {
			setGameStatusMessage({
				message: '',
				isShow: false,
				color: 'secondary',
			});
		}
	);
	const [gameStatusMessage, setGameStatusMessage] = useState<GameStatusMessage>({
		message: '',
		isShow: false,
		color: 'secondary',
	});

	function markCell(index: number) {
		if (!isWinner) {
			const boardState = currentBoardState.slice();
			if (boardState[index].symbol === 'empty') {
				boardState[index].symbol = currentMove.symbol;
				setCurrentBoardState(boardState);
				console.log(currentBoardState);
				checkIfWinnerFind();
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
	}

	return (
		<GameBoardWrap>
			<GameInfo gameStatusMessage={gameStatusMessage} currentMove={currentMove} playersData={playersData} />
			<PlayField>
				{currentBoardState.map((item, index) => {
					return <FieldCell key={nanoid()} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
			<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={resetState} icon={'restart'} />
		</GameBoardWrap>
	);
};
