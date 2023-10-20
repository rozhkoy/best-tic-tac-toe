import { routes } from '@/app/provider/routes';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const Navbar = () => {
	const userInfo = useAppSelector((state) => state.user);

	return (
		<ul className='nav-bar'>
			<li className='nav-bar__item'>
				<NavLink to={routes.HOME} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')} end>
					home
				</NavLink>
			</li>
			<li className='nav-bar__item'>
				<NavLink to={routes.FRIENDS} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					friends
				</NavLink>
			</li>
			<li className='nav-bar__item'>
				<NavLink to={`${routes.USER}/${userInfo.userId}`} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					profile
				</NavLink>
			</li>
		</ul>
	);
};
