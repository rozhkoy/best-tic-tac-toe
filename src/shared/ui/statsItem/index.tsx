import classNames from 'classnames';
import { StatsItemProps } from './types';
import './styles.scss';

export const StatsItem: React.FC<StatsItemProps> = ({ className, number, text }) => {
	return (
		<article className={classNames(className, 'stats-item')}>
			<p className="stats-item__number">{number}</p>
			<h3 className="stats-item__text">{text}</h3>
		</article>
	);
};
