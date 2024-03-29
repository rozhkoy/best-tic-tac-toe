import './styles.scss';
import { Devider } from '@/shared/ui/devider';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/provider/routes';
import { CustomRadio } from '@/shared/ui/CustomRadio';

export const GameSelector = () => {
	const [gameMode, setGameMode] = useState<string>('bot');
	const [hardLevel, setHardlevel] = useState<string>('easy');
	const navigate = useNavigate();

	function gameSelectorHandler() {
		switch (gameMode) {
			case 'bot':
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
				<div className='game-option__heading'>Game mode</div>
				<CustomRadio onChange={setGameMode} value={gameMode} fields={['bot', '2p', 'online']} />
			</div>
			<div className='game-option'>
				<div className={classNames('game-option__heading', { 'game-option__heading--disabled': gameMode !== 'bot' })}>Hard level</div>
				<CustomRadio onChange={setHardlevel} value={hardLevel} disabled={gameMode !== 'bot'} fields={['easy', 'normal', 'hard']} />
			</div>
			<Devider />
			<Button size={'medium'} variant={'primary'} onClick={gameSelectorHandler} fullWidth={true} title={'Start'} type={'button'} />
		</div>
	);
};
