import { routes } from '@/app/provider/routes';

import './style.scss';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { CustomNavLink } from '@/shared/ui/customNavlink';
import { useDispatch } from 'react-redux';
import { toggleVisibleWithPath } from '@/features/warningPopupProvider';

export const Navbar = () => {
	const userInfo = useAppSelector((state) => state.user);
	const dispath = useDispatch();

	function onWarningHandler(redirectPath: string) {
		console.log(userInfo);
		dispath(toggleVisibleWithPath({ isVisible: true, redirectPath }));
	}

	return (
		<ul className='nav-bar'>
			<li className='nav-bar__item'>
				<CustomNavLink
					to={routes.HOME}
					className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}
					onWarning={onWarningHandler}
					isBlock={userInfo.isPlaying}>
					home
				</CustomNavLink>
			</li>
			<li className='nav-bar__item'>
				<CustomNavLink
					to={routes.FRIENDS}
					className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}
					onWarning={onWarningHandler}
					isBlock={userInfo.isPlaying}>
					friends
				</CustomNavLink>
			</li>
			<li className='nav-bar__item'>
				<CustomNavLink
					to={`${routes.USER}/${userInfo.userId || '0'}`}
					className={(isActive) => (isActive ? 'nav-bar__item-link nav-bar__item-link--active' : 'nav-bar__item-link')}
					onWarning={onWarningHandler}
					isBlock={userInfo.isPlaying}>
					profile
				</CustomNavLink>
			</li>
		</ul>
	);
};
