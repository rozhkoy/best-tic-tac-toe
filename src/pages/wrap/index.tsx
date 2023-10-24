import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext, WebSocketProvider } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { NotificationsProvider } from '@/features/notifications';
import { addNotif } from '@/features/notifications/store';
import { nanoid } from 'nanoid';
import { AlertProvider } from '@/features/alertProvider';
import { Settings } from '@/features/settings/ui';
import { GetAuthState } from '@/features/accountAuth/lib/getAuthState';

export const Wrap = () => {
	const dispath = useAppDispatch();
	const navigation = useNavigate();
	const webSocket = useContext(WebSocketContext);
	const userInfo = useAppSelector((state) => state.user);

	useEffect(() => {
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

	return (
		<GetAuthState>
			<WebSocketProvider url={`ws://localhost:5000?userId=${userInfo.userId}`} connect={userInfo.isAuth}>
				<div className='wrap'>
					<Header />
					<div className='wrap__container'>
						<Outlet />
					</div>
					<NotificationsProvider />
					<AlertProvider />
					<Settings />
				</div>
			</WebSocketProvider>
		</GetAuthState>
	);
};
