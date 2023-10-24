import { BlurLayer } from '../blurLayer';
import { GameOverPopupProps } from './types';
import './styles.scss';
import { Button } from '../button';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const GameOverPopup: React.FC<GameOverPopupProps> = ({ message, color }) => {
	const navigation = useNavigate();

	return (
		<BlurLayer className='game-over-pop-up'>
			<div className='game-over-pop-up__window'>
				<div className={classNames('game-info__status', `game-info__status--${color}`)}>{message}</div>
				<div className='game-over-pop-up__btns'>
					<Button size={'medium'} variant={'secondary'} fullWidth={true} type={'button'} title={'Home'} onClick={() => navigation('/', { replace: true })} />
				</div>
			</div>
		</BlurLayer>
	);
};
