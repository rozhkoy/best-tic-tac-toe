import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutesProps } from '../types';

export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children, redirectPath, isAllow }) => {
	const userInfo = useAppSelector((state) => state.user);
	const navigation = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (userInfo.isloaded && !userInfo.isAuth && isAllow) {
			navigation(redirectPath, { replace: true });
		}
	}, [isAllow, location, navigation, redirectPath, userInfo.isAuth]);

	return <>{children}</>;
};
