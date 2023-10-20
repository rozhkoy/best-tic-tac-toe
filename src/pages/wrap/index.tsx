import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { NotificationsProvider } from '@/features/notifications';
import { addNotif } from '@/features/notifications/store';
import { nanoid } from 'nanoid';
import { AlertProvider } from '@/features/alertProvider';

export const Wrap = () => {
	const userInfo = useAppSelector((state) => state.user);

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

	// useEffect(() => { // this is older way update online status
	// 	if (userInfo.isAuth) {
	// 		udpateUserStatus('online');
	// 	}
	// }, [userInfo.isAuth]);

	// function udpateUserStatus(status: UserStatusTypes) {
	// 	const message: IWebSocketMessage<IUpdateUserStatusData> = {
	// 		event: websocketEventNames.UPDATE_USER_STATUS,
	// 		userId: userInfo.userId,
	// 		data: {
	// 			status,
	// 		},
	// 		error: '',
	// 	};
	// 	webSocket?.send(JSON.stringify(message));
	// }

	return (
		<div className='wrap'>
			<Header />
			<div className='wrap__container'>
				<Outlet />
			</div>
			<NotificationsProvider />
			<AlertProvider />
		</div>
	);
};
