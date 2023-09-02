import { Avatar } from '../avatar';
import { Button } from '../button';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';
import { InviteToGameNotifsProps } from './types';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { removeNotif, toggleVisible } from '@/features/notifications/store';
import { useEffect } from 'react';

export const InviteToGameNotifs: React.FC<InviteToGameNotifsProps> = ({ src, friendId, userId, nickname, isVisible, id }) => {
	const dispatch = useAppDispatch();

	function onEnter() {
		dispatch(toggleVisible({ id, isVisible: true }));
	}

	function onExited() {
		dispatch(removeNotif(id));
	}

	useEffect(() => {
		const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
			dispatch(toggleVisible({ id, isVisible: false }));
		}, 60_000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<CSSTransition onEnter={onEnter} in={isVisible} timeout={1000} classNames="fade" onExited={onExited} unmountOnExit>
			<div className="invite-to-game-notif">
				<div className="user-info">
					<Avatar size="small" className="user-info__logo" src={src} />
					<div className="user-info__info">
						<div className="user-info__nickname">{nickname}</div>
						<div className="user-info__action">Invite to game</div>
					</div>
				</div>
				<div className="invite-to-game-notif__btns">
					<Button onClick={() => dispatch(toggleVisible({ id, isVisible: false }))} size={'default'} variant={'default'} fullWidth={false} icon={'mark'} type={'button'} />
					<Button size={'default'} variant={'default'} fullWidth={false} icon={'reject'} type={'button'} />
				</div>
			</div>
		</CSSTransition>
	);
};
