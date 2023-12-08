import { Avatar } from '../avatar';
import { Button } from '../button';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';
import { IAcceptInviteToGame, InviteToGameNotifsProps } from './types';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { removeNotif, toggleNotificationsVisible, toggleVisible } from '@/features/notifications/store';
import { useContext, useEffect } from 'react';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';

export const InviteToGameNotifs: React.FC<InviteToGameNotifsProps> = ({ src, friendId, userId, nickname, isVisible, id }) => {
	const dispatch = useAppDispatch();
	const webSocket = useContext(WebSocketContext);

	function onEnter() {
		dispatch(toggleVisible({ id, isVisible: true }));
	}

	function onExited() {
		dispatch(removeNotif(id));
	}

	useEffect(() => {
		const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
			dispatch(toggleVisible({ id, isVisible: false }));
			rejectInviteToGame(friendId, userId);
		}, 60_000);
		return () => {
			clearInterval(timer);
		};
	}, [dispatch, friendId, id, userId]);

	function acceptInviteToGame(friendId: string, userId: string) {
		const { innerWidth } = window;

		if (innerWidth <= 991) {
			dispatch(toggleNotificationsVisible(false));
		}

		const message: IWebSocketMessage<IAcceptInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED,
			userId: userId,
			data: {
				friendId,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		dispatch(dispatch(toggleVisible({ id, isVisible: false })));
	}

	function rejectInviteToGame(friendId: string, userId: string) {
		const message: IWebSocketMessage<IAcceptInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_REJECTED,
			userId: userId,
			data: {
				friendId,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		dispatch(dispatch(toggleVisible({ id, isVisible: false })));
	}

	return (
		<CSSTransition onEnter={onEnter} in={isVisible} timeout={500} classNames='fade' onExited={onExited} unmountOnExit>
			<div className='invite-to-game-notif'>
				<div className='user-info'>
					<Avatar size='small' className='user-info__logo' src={src} />
					<div className='user-info__info'>
						<div className='user-info__nickname'>{nickname}</div>
						<div className='user-info__action'>Invites in game</div>
					</div>
				</div>
				<div className='invite-to-game-notif__btns'>
					<Button size={'default'} variant={'default'} fullWidth={false} icon={'mark'} onClick={() => acceptInviteToGame(friendId, userId)} type={'button'} />
					<Button size={'default'} variant={'default'} fullWidth={false} icon={'reject'} onClick={() => rejectInviteToGame(friendId, userId)} type={'button'} />
				</div>
			</div>
		</CSSTransition>
	);
};
