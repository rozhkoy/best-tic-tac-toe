import classNames from 'classnames';
import { HistoryItemProps } from './types';
import './styles.scss';
import { forwardRef } from 'react';
import { SkeletonItem } from '../skeletonItem';

export const HistoryItem = forwardRef<HTMLLIElement, HistoryItemProps>(({ className, nickname, status, statusColor = 'white', date, dateTime }, ref) => {
	return (
		<li ref={ref} className={classNames('history-item', className)}>
			<div className={'history-item__text-box'}>
				<h3 className={'history-item__nickname'}>{nickname}</h3>
				<time dateTime={dateTime} className={'history-item__date'}>
					{date}
				</time>
			</div>
			<p className={`history-item__status history-item__status--${statusColor}`}>{status}</p>
		</li>
	);
});

export const HistoryItemSkeleton = () => {
	return (
		<li className='history-item'>
			<div className='history-item__text-box history-item__text-box--with-gap'>
				<SkeletonItem width={70} height={16} />
				<SkeletonItem width={80} height={11} />
			</div>
			<SkeletonItem width={60} height={22} />
		</li>
	);
};
