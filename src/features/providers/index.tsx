import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketProvider } from '@/shared/providers/WebSocketProvider';
import { PropsWithChildren } from 'react';
import { GetAuthState } from '../accountAuth';
import { Preloader } from '@/shared/ui/preloader';
import { CSSTransition } from 'react-transition-group';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	const userInfo = useAppSelector((state) => state.user);
	return (
		<>
			<GetAuthState>
				<WebSocketProvider url={`ws://localhost:5000?userId=${userInfo.userId}`} connect={userInfo.isAuth}>
					{/* <WebSocketProvider url={`wss://h9trjjj9-5173.euw.devtunnels.ms/?userId=${userInfo.userId}`} connect={userInfo.isAuth}> */}
					{children}
				</WebSocketProvider>
			</GetAuthState>
			<CSSTransition in={!userInfo.isloaded} timeout={1000} classNames='opacity' unmountOnExit>
				<Preloader />
			</CSSTransition>
		</>
	);
};
