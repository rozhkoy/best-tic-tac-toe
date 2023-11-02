import { InviteToGameNotifs } from '@/shared/ui/inviteToGameNotif';
import './style.scss';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';

export const NotificationsProvider = () => {
	const { notifs, isVisible } = useAppSelector((state) => state.notifs);

	return (
		<CSSTransition timeout={300} in={isVisible} classNames='opacity' unmountOnExit>
			<div className='notifs-provider'>
				<div className='notifs-provider__box'>
					<TransitionGroup className='notifs-provider__scroll-box'>
						{notifs.map((itemProps) => {
							return <InviteToGameNotifs key={itemProps.id} {...itemProps} />;
						})}
					</TransitionGroup>
				</div>
			</div>
		</CSSTransition>
	);
};
