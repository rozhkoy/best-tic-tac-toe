import classNames from 'classnames';
import { HistoryItemProps } from './types';
import './styles.scss';

export const HistoryItem: React.FC<HistoryItemProps> = ({ className, nickname, status, statusColor = 'white', date, dateTime }) => {
	return (
		<article className={classNames('history-item', className)}>
			<div className={'history-item__text-box'}>
				<h3 className={'history-item__nickname'}>{nickname}</h3>
				<time dateTime={dateTime} className={'history-item__date'}>
					{date}
				</time>
			</div>
			<p className={`history-item__status history-item__status--${statusColor}`}>{status}</p>
		</article>
	);
};
