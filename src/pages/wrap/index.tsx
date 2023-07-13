import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';
import { useWebSocketConnection } from '@/features/webSocketConnection';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const Wrap = () => {
	const userInfo = useAppSelector((state) => state.user);

	const { getAuthState } = useFirebaseAuth();
	const { udpateUserStatus } = useWebSocketConnection({});

	useEffect(() => {
		getAuthState();
	}, []);

	useEffect(() => {
		if (userInfo.isAuth) {
			udpateUserStatus('online');
		}
	}, [userInfo.isAuth]);

	return (
		<div className="wrap">
			<Header />
			<div className="wrap__container">
				<Outlet />
			</div>
		</div>
	);
};
