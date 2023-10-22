import './styles.scss';
import { Devider } from '@/shared/ui/devider';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/provider/routes';
import { CustomRadio } from '@/shared/ui/CustomRadio';

export const GameSelector = () => {
	const [gameMode, setGameMode] = useState<string>('1p');
	const [hardLevel, setHardlevel] = useState<string>('easy');
	const navigate = useNavigate();

	function gameSelectorHandler() {
		switch (gameMode) {
			case '1p':
				navigate(`/${routes.WITH_BOT_SESSION}/${hardLevel}`);
				break;
			case '2p':
				navigate(`/${routes.TWO_PLAYERS_SESSION}`);
				break;
			case 'online':
				navigate(`${routes.FRIENDS}`);
				break;
		}
	}

	return (
		<div className='game-selector'>
			<div className='game-option'>
				<div className='game-option__heading'>Number of players</div>
				<CustomRadio onChange={setGameMode} value={gameMode} fields={['1p', '2p', 'online']} />
			</div>
			<div className='game-option'>
				<div className={classNames('game-option__heading', { 'game-option__heading--disabled': gameMode !== '1p' })}>Hard level</div>
				<CustomRadio onChange={setHardlevel} value={hardLevel} disabled={gameMode !== '1p'} fields={['easy', 'normal', 'hard']} />
			</div>
			<Devider />
			<Button size={'medium'} variant={'primary'} onClick={gameSelectorHandler} fullWidth={true} title={'Start'} type={'button'} />
		</div>
	);
};
