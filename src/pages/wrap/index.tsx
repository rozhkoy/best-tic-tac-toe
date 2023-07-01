import { PropsWithChildren, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';
import { useWebSocketConnection } from '@/features/webSocketConnection';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const Wrap: React.FC<PropsWithChildren> = ({ children }) => {
	const { getAuthState } = useFirebaseAuth();
	const { webSocketConnect } = useWebSocketConnection();
	const userData = useAppSelector((state) => state.user);

	useEffect(() => {
		getAuthState();
	}, []);

	useEffect(() => {
		if (userData.isAuth) {
			webSocketConnect();
		}
	}, [userData.isAuth]);

	return (
		<div className="wrap">
			<Header />
			<div className="wrap__container">
				<Outlet />
			</div>
		</div>
	);
};
