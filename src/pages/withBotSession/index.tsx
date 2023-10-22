import { GameBoardWrap, GameInfo, PlayField, usePlayFieldHandler } from '@/features/playGround';
import { useEffect, useState } from 'react';
import { FieldCell } from '@/shared/ui/fieldCell';
import { GameStatusMessage, IPlayers } from '@/features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from '@/shared/ui/button';
import { useParams } from 'react-router-dom';
import { useMiniMax } from '@/features/playGround/lib/useMiniMax';
import { ParamsWithBotSessionPageTypes } from './types';

export const WithBotSession = () => {
	const { hardLevel } = useParams<ParamsWithBotSessionPageTypes>();
	const [playersData, setPlayersData] = useState<IPlayers>({
		cross: {
			nickname: 'Player',
			score: 0,
		},
		nought: {
			nickname: 'BOT',
			score: 0,
		},
	});
	const { playFieldState, resetState, currentMove, markCell, isWinner } = usePlayFieldHandler(
		[],
		playersData,
		(symbol) => {
			switch (symbol) {
				case 'cross':
					setGameStatusMessage(({ ...value }) => {
						value.color = 'secondary';
						value.isShow = true;
						value.message = 'You Won!';
						return value;
					});

					setPlayersData(({ ...value }) => {
						value.cross.score = ++value.cross.score;
						return value;
					});
					break;
				case 'nought':
					setGameStatusMessage(({ ...value }) => {
						value.color = 'red';
						value.isShow = true;
						value.message = 'You Lost!';
						return value;
					});
					setPlayersData(({ ...value }) => {
						value.nought.score = ++value.nought.score;
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
	const { miniMax } = useMiniMax(hardLevel ?? 'easy');

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		if (currentMove.player === 'BOT' && !isWinner) {
			timeoutId = setTimeout(() => {
				const moveResult = miniMax(playFieldState, 'nought', 0);
				markCell(moveResult.index ? moveResult.index : 0);
			}, 500);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentMove]);

	return (
		<GameBoardWrap>
			<GameInfo playersData={playersData} currentMove={currentMove} gameStatusMessage={gameStatusMessage} />
			<PlayField>
				{playFieldState.map((item, index) => {
					return <FieldCell blockMove={currentMove.player !== 'Player'} key={nanoid()} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
			<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={resetState} icon={'restart'} />
		</GameBoardWrap>
	);
};
