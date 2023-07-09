import { Avatar } from '../avatar';
import { Icon } from '../icon';
import { PlayerWaitingProps } from './types';
import './styles.scss';

export const PlayerWaiting: React.FC<PlayerWaitingProps> = ({ cancelHandler, avatarSrc, nickname }) => (
	<div className="player-waiting">
		<Avatar src={avatarSrc} size="small" className="player-waiting__avatar" />
		<div className="player-waiting__info">
			<div className="player-waiting__nickname">{nickname}</div>
			<div className="player-waiting__status">Waiting ...</div>
		</div>
		<button onClick={cancelHandler} className="player-waiting__cancel">
			<Icon name={'cross'} />
		</button>
	</div>
);
