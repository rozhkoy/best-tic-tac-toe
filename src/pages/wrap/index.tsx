import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { IUpdateUserStatusData } from '@/entities/user/types';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { NotificationsProvider } from '@/features/notifications';
import { addNotif } from '@/features/notifications/store';
import { nanoid } from 'nanoid';

export const Wrap = () => {
	const userInfo = useAppSelector((state) => state.user);
	const notifs = useAppSelector((state) => state.notifs);
	const dispath = useAppDispatch();
	const navigation = useNavigate();
	const webSocket = useContext(WebSocketContext);

	const { getAuthState } = useFirebaseAuth();

	useEffect(() => {
		if (!userInfo.isAuth) {
			getAuthState();
		}

		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME, (message) => {
				dispath(addNotif({ userId: message.data.friendId, friendId: message.userId, src: '', nickname: message.data.userInfo.nickname, isVisible: true, id: nanoid() }));
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED, ({ data }) => {
				console.log(data.sessionId);
				navigation(`/online-session/${data.sessionId}`);
			});

			return () => {
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED);
			};
		}
	}, []);

	useEffect(() => {
		if (userInfo.isAuth) {
			udpateUserStatus('online');
		}
	}, [userInfo.isAuth]);

	function udpateUserStatus(status: UserStatusTypes) {
		const message: IWebSocketMessage<IUpdateUserStatusData> = {
			event: websocketEventNames.UPDATE_USER_STATUS,
			userId: userInfo.userId,
			data: {
				status,
			},
		};
		webSocket?.instance.send(JSON.stringify(message));
	}

	return (
		<div className='wrap'>
			<Header />
			<div className='wrap__container'>
				<Outlet />
			</div>
			<NotificationsProvider />
		</div>
	);
};
