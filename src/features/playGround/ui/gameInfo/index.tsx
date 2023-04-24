import { Icon } from 'shared/ui/icon';
import './styles.scss';

export const GameInfo = () => {
	return (
		<div className="game-info">
			<div className="game-info__player">
				<Icon name={'cross'} />
				<span className="game-info__player-nickname game-info__player-nickname--left">Player1</span>
			</div>
			<div className="game-info__score">
				<span className="game-info__score-number">0</span>
				<span className="game-info__score-number">:</span>
				<span className="game-info__score-number">0</span>
			</div>
			<div className="game-info__player">
				<span className="game-info__player-nickname game-info__player-nickname--right">Player2</span>
				<Icon name={'nought'} />
			</div>
		</div>
	);
};
