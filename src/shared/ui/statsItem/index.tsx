import classNames from 'classnames';
import { StatsItemProps } from './types';
import './styles.scss';
import { unitSuffixes } from '@/shared/lib/unitSuffixes';
import { SkeletonItem } from '../skeletonItem';

export const StatsItem: React.FC<StatsItemProps> = ({ className, number, text }) => {
	return (
		<div className={classNames(className, 'stats-item')}>
			<p className='stats-item__number'>{unitSuffixes(number)}</p>
			<h3 className='stats-item__text'>{text}</h3>
		</div>
	);
};

export const StatsItemSkeleton = () => {
	return (
		<div className='stats-item stats-item-skeleton'>
			<SkeletonItem height={48} width={75} className='stats-item-skeleton__number' />
			<SkeletonItem height={26} width={100} className='stats-item-skeleton__title' />
		</div>
	);
};
