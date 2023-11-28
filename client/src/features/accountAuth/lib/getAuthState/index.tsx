import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { PropsWithChildren, useEffect } from 'react';
import { useFirebaseAuth } from '../useFirebaseAuth';

export const GetAuthState: React.FC<PropsWithChildren> = ({ children }) => {
	const userInfo = useAppSelector((state) => state.user);
	const { getAuthState } = useFirebaseAuth();

	useEffect(() => {
		if (!userInfo.isAuth) {
			getAuthState();
		}
	}, []);

	return <>{children}</>;
};
