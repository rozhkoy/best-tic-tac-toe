import { routes } from '@/app/provider/routes';

import './style.scss';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	const userInfo = useAppSelector((state) => state.user);

	return (
		<ul className='nav-bar'>
			<li className='nav-bar__item'>
				<NavLink to={routes.HOME} className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					home
				</NavLink>
			</li>
			<li className='nav-bar__item'>
				<NavLink to={routes.FRIENDS} className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					friends
				</NavLink>
			</li>
			<li className='nav-bar__item'>
				<NavLink to={`${routes.USER}/${userInfo.userId || '0'}`} className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					profile
				</NavLink>
			</li>
		</ul>
	);
};
