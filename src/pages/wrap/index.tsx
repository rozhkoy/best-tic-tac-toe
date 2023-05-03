import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets';
import './style.scss';

export const Wrap: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="wrap">
			<Header />
			<div className="wrap__container">
				<Outlet />
			</div>
		</div>
	);
};
