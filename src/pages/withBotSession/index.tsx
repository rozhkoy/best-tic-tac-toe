import { GameBoardWrap, GameInfo, PlayField, usePlayFieldHandler } from 'features/playGround';
import { useEffect, useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IPlayerData } from 'features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from 'shared/ui/button';
import { useParams } from 'react-router-dom';
import { useMiniMax } from 'features/playGround/lib/useMiniMax';
import { ParamsWithBotSessionPageTypes } from './types';

export const WithBotSession = () => {
	const { hardLevel } = useParams<ParamsWithBotSessionPageTypes>();
	const [playersData, setPlayersData] = useState<Array<IPlayerData>>([
		{ nickName: 'Player', score: 0 },
		{ nickName: 'Bot', score: 0 },
	]);
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
						value[1].score = ++value[0].score;
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
						value[0].score = ++value[1].score;
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
	const { miniMax } = useMiniMax(hardLevel ?? 'Easy');

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {}, 500);

		if (currentMove.player === 'Bot' && !isWinner) {
			timeoutId = setTimeout(() => {
				const moveResult = miniMax(playFieldState, 'nought', 0);
				if (moveResult.index) {
					markCell(moveResult.index);
				}
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
