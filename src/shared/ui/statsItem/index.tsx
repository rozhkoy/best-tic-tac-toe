import classNames from 'classnames';
import { StatsItemProps } from './types';
import './styles.scss';
import { unitSuffixes } from '@/shared/lib/unitSuffixes';

export const StatsItem: React.FC<StatsItemProps> = ({ className, number, text }) => {
	return (
		<div className={classNames(className, 'stats-item')}>
			<p className='stats-item__number'>{unitSuffixes(number)}</p>
			<h3 className='stats-item__text'>{text}</h3>
		</div>
	);
};
