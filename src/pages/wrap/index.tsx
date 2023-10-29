import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { NotificationsProvider } from '@/features/notifications';
import { addNotif } from '@/features/notifications/store';
import { nanoid } from 'nanoid';
import { AlertProvider } from '@/features/alertProvider';
import { Settings } from '@/features/settings/ui';

import { updateIsPlayingStatus } from '@/entities/user';

export const Wrap = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const webSocket = useContext(WebSocketContext);

	useEffect(() => {
		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME, (message) => {
				dispatch(addNotif({ userId: message.data.friendId, friendId: message.userId, src: '', nickname: message.data.userInfo.nickname, isVisible: true, id: nanoid() }));
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED, ({ data }) => {
				navigation(`/online-session/${data.sessionId}`);
			});

			return () => {
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED);
			};
		}
	}, []);

	return (
		<div className='wrap'>
			<Header />
			<div className='wrap__container'>
				<Outlet />
			</div>
			<NotificationsProvider />
			<AlertProvider />
			<Settings />
		</div>
	);
};
