import { GameBoardWrap, GameInfo, PlayField, useFindWinner } from 'features/playGround';
import { useEffect, useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IPlayerData } from 'features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from 'shared/ui/button';
import { ICellData } from 'shared/ui/fieldCell/types';
import { useParams } from 'react-router-dom';
import { useMiniMax } from 'features/playGround/lib/useMinMax';
import { HardLevelTypes } from 'features/gameSelector/types';
import { ParamsWithBotSessionPageTypes } from './types';

export const WithBotSession = () => {
	const { hardLevel } = useParams<ParamsWithBotSessionPageTypes>();
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
	const { miniMax } = useMiniMax(hardLevel ?? 'Easy');

	function markCell(index: number) {
		if (!isWinner) {
			const boardState = currentBoardState.slice();
			if (boardState[index].symbol === 'empty') {
				boardState[index].symbol = currentMove.symbol;
				setCurrentBoardState(boardState);
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

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {}, 500);

		if (currentMove.player === 'Bot') {
			timeoutId = setTimeout(() => {
				const moveResult = miniMax(currentBoardState, 'nought', 0);
				if (moveResult.index) {
					markCell(moveResult.index);
				}
			}, 500);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentMove]);

	useEffect(() => {
		checkIfWinnerFind();
	}, [currentBoardState]);

	return (
		<GameBoardWrap>
			<GameInfo playersData={playersData} currentMove={currentMove} gameStatusMessage={gameStatusMessage} />
			<PlayField>
				{currentBoardState.map((item, index) => {
					return <FieldCell blockMove={currentMove.player !== 'Player'} key={nanoid()} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
			<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={resetState} icon={'restart'} />
		</GameBoardWrap>
	);
};
