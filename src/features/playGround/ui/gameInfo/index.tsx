import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import { GameInfoProps } from '@/features/playGround/types';
import classNames from 'classnames';

export const GameInfo: React.FC<GameInfoProps> = ({ playersData, currentMove, gameStatusMessage }) => {
	return (
		<div className="game-info">
			{gameStatusMessage.isShow ? (
				<div className={classNames('game-info__status', `game-info__status--${gameStatusMessage.color}`)}>{gameStatusMessage.message}</div>
			) : (
				<div className="game-info__plate">
					<div className="game-info__player">
						<Icon name={'cross'} className={classNames('game-info__symbol-icon', { 'game-info__symbol-icon--active': currentMove.player === playersData[0].nickName })} />
						<span
							className={classNames('game-info__player-nickname game-info__player-nickname--left', {
								'game-info__player-nickname--active': currentMove.player === playersData[0].nickName,
							})}>
							{playersData[0].nickName}
						</span>
					</div>
					<div className="game-info__score">
						<span className="game-info__score-number">{playersData[0].score}</span>
						<span className="game-info__score-number">:</span>
						<span className="game-info__score-number">{playersData[1].score}</span>
					</div>
					<div className="game-info__player">
						<span
							className={classNames('game-info__player-nickname game-info__player-nickname--right', {
								'game-info__player-nickname--active': currentMove.player === playersData[1].nickName,
							})}>
							{playersData[1].nickName}
						</span>
						<Icon name={'nought'} className={classNames('game-info__symbol-icon', { 'game-info__symbol-icon--active': currentMove.player === playersData[1].nickName })} />
					</div>
				</div>
			)}
		</div>
	);
};
