import { Icon } from '../icon';
import './styles.scss';
import { PlayerSearchTimerProps } from './types';

export const PlayerSearchTimer: React.FC<PlayerSearchTimerProps> = ({ timer }) => {
	return (
		<div className='player-search-timer'>
			<div className='player-search-timer__timer'>{timer}</div>
			<div className='player-search-timer__search'>Searching ...</div>
			<button className='player-search-timer__cancel'>
				<Icon name={'cross'} />
			</button>
		</div>
	);
};
