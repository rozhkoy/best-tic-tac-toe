import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';

import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { IUpdateUserStatusData } from '@/entities/user/types';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { IAcceptInviteToGame } from '@/features/webSocketConnection/types';

export const Wrap = () => {
	const userInfo = useAppSelector((state) => state.user);
	const navigation = useNavigate();
	const webSocket = useContext(WebSocketContext);

	const { getAuthState } = useFirebaseAuth();

	useEffect(() => {
		getAuthState();

		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.SEND_INVITE_TO_FRIENDSHIP, () => {
				console.log('invite');
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME, (message) => {
				const result = confirm('Are you accpet invite?');
				if (result) {
					console.log('ok', userInfo);

					acceptInviteToGame(message.userId, message.data.friendId);
				}
			});

			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED, ({ data }) => {
				console.log(data.sessionId);
				navigation(`/online-session/${data.sessionId}`);
			});

			return () => {
				webSocket.unSubscribeToOnUpdate(websocketEventNames.SEND_INVITE_TO_FRIENDSHIP);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME);
				webSocket.unSubscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED);
			};
		}
	}, []);

	useEffect(() => {
		console.log('update', userInfo);
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

	function acceptInviteToGame(friendId: string, userId: number) {
		console.log(friendId, userInfo.userId);
		const message: IWebSocketMessage<IAcceptInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED,
			userId: userId,
			data: {
				friendId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
	}

	return (
		<div className="wrap">
			<Header />
			<div className="wrap__container">
				<Outlet />
			</div>
		</div>
	);
};
