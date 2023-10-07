import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import { GameInfoProps } from '@/features/playGround/types';
import classNames from 'classnames';

export const GameInfo: React.FC<GameInfoProps> = ({ playersData, currentMove, gameStatusMessage }) => {
	return (
		<div className='game-info'>
			{gameStatusMessage.isShow ? (
				<div className={classNames('game-info__status', `game-info__status--${gameStatusMessage.color}`)}>{gameStatusMessage.message}</div>
			) : (
				<div className='game-info__plate'>
					<div className='game-info__player'>
						<Icon name={'cross'} className={classNames('game-info__symbol-icon', { 'game-info__symbol-icon--active': currentMove.player === playersData.cross.nickname })} />
						<span
							className={classNames('game-info__player-nickname game-info__player-nickname--left', {
								'game-info__player-nickname--active': currentMove.player === playersData.cross.nickname,
							})}>
							{playersData.cross.nickname}
						</span>
					</div>
					<div className='game-info__score'>
						<span className='game-info__score-number'>{playersData.cross.score}</span>
						<span className='game-info__score-number'>:</span>
						<span className='game-info__score-number'>{playersData.nought.score}</span>
					</div>
					<div className='game-info__player'>
						<span
							className={classNames('game-info__player-nickname game-info__player-nickname--right', {
								'game-info__player-nickname--active': currentMove.player === playersData.nought.nickname,
							})}>
							{playersData.nought.nickname}
						</span>
						<Icon name={'nought'} className={classNames('game-info__symbol-icon', { 'game-info__symbol-icon--active': currentMove.player === playersData.nought.nickname })} />
					</div>
				</div>
			)}
		</div>
	);
};
