import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { PrivateRoutesProps } from '../types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/app/provider/routes';

export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ isReverse = false, children }) => {
	const userInfo = useAppSelector((state) => state.user);
	const navigation = useNavigate();

	useEffect(() => {
		if (!userInfo && !isReverse) {
			navigation(routes.SIGN_IN);
		} else if (userInfo && isReverse) {
			navigation(routes.HOME);
		}
	}, [userInfo, isReverse, navigation]);

	return <>{children}</>;
};
