import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { toggleNotificationsVisible } from '../../store';
import classNames from 'classnames';
import { CustomButton } from '@/shared/ui/button';

export const MobileNotifsBtn = () => {
	const { isVisible, notifs } = useAppSelector((state) => state.notifs);
	const dispatch = useAppDispatch();

	return (
		<CustomButton size={'tiny'} className='mobile-notifs-btn' onClick={() => dispatch(toggleNotificationsVisible(!isVisible))}>
			<Icon name='notifications' />
			<span className={classNames('mobile-notifs-btn__number-of-notifs', { 'mobile-notifs-btn__number-of-notifs--active': !!notifs.length })}>{notifs.length}</span>
		</CustomButton>
	);
};
