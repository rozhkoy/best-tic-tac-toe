import './styles.scss';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { FieldCell } from '@/shared/ui/fieldCell';
import { GameStatusMessage, IPlayers } from '@/features/playGround/types';
import { GameBoardWrap, GameInfo, PlayField, usePlayFieldHandler } from '@/features/playGround';

export const TwoPlayersSession = () => {
	const [playersData, setPlayersData] = useState<IPlayers>({
		nought: {
			nickname: 'Player 1',
			score: 0,
		},
		cross: {
			nickname: 'Player 1',
			score: 0,
		},
	});
	const { playFieldState, resetState, currentMove, markCell } = usePlayFieldHandler(
		[],
		playersData,
		(symbol) => {
			switch (symbol) {
				case 'cross':
					setGameStatusMessage(({ ...value }) => {
						value.color = 'secondary';
						value.isShow = true;
						value.message = 'The crosses won!';
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
						value.message = 'The noughts won!';
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

	return (
		<GameBoardWrap>
			<GameInfo gameStatusMessage={gameStatusMessage} currentMove={currentMove} playersData={playersData} />
			<PlayField>
				{playFieldState.map((item, index) => {
					return <FieldCell key={item.id} symbolName={item.symbol} highlight={item.highlight} markCell={markCell} index={index} />;
				})}
			</PlayField>
			<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} onClick={resetState} icon={'restart'} />
		</GameBoardWrap>
	);
};
