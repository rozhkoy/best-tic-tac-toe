import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';
import { NotificationsProvider } from '@/features/notifications';
import { addNotif } from '@/features/notifications/store';
import { nanoid } from 'nanoid';
import { AlertProvider } from '@/features/alertProvider';
import { Settings } from '@/features/settings/ui';

import { updateUserRating } from '@/entities/user';
import { useQuery } from '@tanstack/react-query';
import { getUserRating } from '@/features/accountAuth/api';
import { MobileNav } from '@/features/navigation/ui/mobileNavbar';

export const Wrap = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const webSocket = useContext(WebSocketContext);
	const userInfo = useAppSelector((state) => state.user);
	const [isFetchUserRating, setIsFetchUserRating] = useState(false);

	useQuery({
		queryKey: ['userRating'],
		queryFn: () => getUserRating({ userId: userInfo.userId }),
		onSuccess: (data) => {
			dispatch(updateUserRating(data));
			setIsFetchUserRating(false);
		},
		enabled: isFetchUserRating,
	});

	useEffect(() => {
		if (!userInfo.isPlaying && userInfo.isloaded && !isFetchUserRating) {
			setIsFetchUserRating(true);
		}
	}, [userInfo.isPlaying, userInfo.isloaded]);

	useEffect(() => {
		if (webSocket) {
			webSocket.subscribeToOnUpdate(websocketEventNames.INVITE_TO_GAME, (message) => {
				dispatch(
					addNotif({
						userId: message.data.friendId,
						friendId: message.userId,
						src: `https://source.boringavatars.com/beam/100/${message.data.senderInfo.nickname}`,
						nickname: message.data.senderInfo.nickname,
						isVisible: true,
						id: nanoid(),
					})
				);
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
			<MobileNav />
			<div className='wrap__container'>
				<Outlet />
			</div>
			<NotificationsProvider />
			<AlertProvider />
			<Settings />
		</div>
	);
};
