import { routes } from '@/app/provider/routes';
import { NavLink } from 'react-router-dom';
import './style.scss';

export const Navbar = () => {
	return (
		<ul className="nav-bar">
			<li className="nav-bar__item">
				<NavLink to={routes.HOME} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')} end>
					home
				</NavLink>
			</li>
			<li className="nav-bar__item">
				<NavLink to={routes.FRIENDS} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					friends
				</NavLink>
			</li>
			<li className="nav-bar__item">
				<NavLink to={routes.TOP_PLAYER} className={({ isActive }) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}>
					top player
				</NavLink>
			</li>
		</ul>
	);
};
