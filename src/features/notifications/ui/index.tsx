import { InviteToGameNotifs } from '@/shared/ui/inviteToGameNotif';
import './style.scss';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { TransitionGroup } from 'react-transition-group';

export const NotificationsProvider = () => {
	const { notifs } = useAppSelector((state) => state.notifs);

	return (
		<div className="notifs-provider">
			<div className="notifs-provider__box">
				<TransitionGroup className="notifs-provider__scroll-box">
					{notifs.map((itemProps) => {
						return <InviteToGameNotifs key={itemProps.id} {...itemProps} />;
					})}
				</TransitionGroup>
			</div>
		</div>
	);
};