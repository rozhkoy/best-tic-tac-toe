import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketProvider } from '@/shared/providers/WebSocketProvider';
import { PropsWithChildren, useContext } from 'react';
import { GetAuthState } from '../accountAuth';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	const userInfo = useAppSelector((state) => state.user);
	return (
		<>
			<GetAuthState>
				<WebSocketProvider url={`ws://localhost:5000?userId=${userInfo.userId}`} connect={userInfo.isAuth}>
					{children}
				</WebSocketProvider>
			</GetAuthState>
		</>
	);
};
