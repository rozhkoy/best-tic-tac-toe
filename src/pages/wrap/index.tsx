import { PropsWithChildren, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';
import './style.scss';
import { useFirebaseAuth } from '@/features/accountAuth';

export const Wrap: React.FC<PropsWithChildren> = ({ children }) => {
	const { getAuthState } = useFirebaseAuth();

	useEffect(() => {
		console.log('get');
		getAuthState();
	}, []);

	return (
		<div className="wrap">
			<Header />
			<div className="wrap__container">
				<Outlet />
			</div>
		</div>
	);
};
