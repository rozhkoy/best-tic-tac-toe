import { GameInfo, PlayField, useFindWinner } from 'features/playGround';
import { GameBoardWrap } from 'features/playGround/ui/gameBoardWrap';
import { useState } from 'react';
import { FieldCell } from 'shared/ui/fieldCell';
import { GameStatusMessage, IPlayerData } from 'features/playGround/types';
import { nanoid } from 'nanoid';
import { Button } from 'shared/ui/button';

export const WithBotSession = () => {
	const [playersData, setPlayersData] = useState<Array<IPlayerData>>([
		{ nickName: 'Player', score: 0 },
		{ nickName: 'Bot', score: 0 },
	]);
	const { currentBoardState, isWinner, checkIfWinnerFind, setCurrentBoardState, currentMove, resetState } = useFindWinner(
		[],
		playersData,
		() => {
			console.log('win');
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

	function markCell() {
		console.log('mark cell');
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
