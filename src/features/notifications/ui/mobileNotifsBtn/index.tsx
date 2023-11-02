import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { toggleNotificationsVisible } from '../../store';
import classNames from 'classnames';

export const MobileNotifsBtn = () => {
	const { isVisible, notifs } = useAppSelector((state) => state.notifs);
	const dispatch = useAppDispatch();

	return (
		<button className='mobile-notifs-btn' onClick={() => dispatch(toggleNotificationsVisible(!isVisible))}>
			<Icon name='notifications' />
			<span className={classNames('mobile-notifs-btn__number-of-notifs', { 'mobile-notifs-btn__number-of-notifs--active': !!notifs.length })}>1</span>
		</button>
	);
};
