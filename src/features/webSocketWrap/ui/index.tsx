import { Wrap } from '@/pages/wrap';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { WebSocketProvider } from '@/shared/providers/WebSocketProvider';

export const WebSocketWrap = () => {
	const userInfo = useAppSelector((state) => state.user);
	return (
		<WebSocketProvider url={`ws://localhost:5000?userId=${userInfo.userId}`} connect={userInfo.isAuth}>
			<Wrap />
		</WebSocketProvider>
	);
};
