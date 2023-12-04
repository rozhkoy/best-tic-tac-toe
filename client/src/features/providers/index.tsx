import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketProvider } from '@/shared/providers/WebSocketProvider';
import { PropsWithChildren } from 'react';
import { GetAuthState } from '../accountAuth';
import { PreloaderProvider } from '../preloader';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	const userInfo = useAppSelector((state) => state.user);
	return (
		<>
			<GetAuthState>
				<WebSocketProvider url={`${import.meta.env.VITE_WS_URL}?userId=${userInfo.userId}`} useWebSocket={userInfo.isAuth}>
					{children}
				</WebSocketProvider>
			</GetAuthState>
			<PreloaderProvider />
		</>
	);
};
