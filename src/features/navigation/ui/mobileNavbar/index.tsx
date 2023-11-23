import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import classNames from 'classnames';

export const MobileNav = () => {
	const userInfo = useAppSelector((state) => state.user);

	return (
		<ul className='mobile-nav'>
			<li className='mobile-nav__item'>
				<NavLink
					to={'/'}
					className={({ isActive }) => {
						return `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`;
					}}>
					{({ isActive }) => {
						return (
							<>
								<Icon name={'home'} color={isActive ? 'secondary' : 'light-gray'} colorType='stroke' />
								<span className={classNames('mobile-nav__link-label', { 'mobile-nav__link-label--active': isActive })}>Home</span>
							</>
						);
					}}
				</NavLink>
			</li>
			<li className='mobile-nav__item'>
				<NavLink
					to={'/friends'}
					className={({ isActive }) => {
						return `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`;
					}}>
					{({ isActive }) => {
						return (
							<>
								<Icon name={'friends'} color={isActive ? 'secondary' : 'light-gray'} />
								<span className={classNames('mobile-nav__link-label', { 'mobile-nav__link-label--active': isActive })}>Friends</span>
							</>
						);
					}}
				</NavLink>
			</li>
			<li className='mobile-nav__item'>
				<NavLink
					to={`/user/${userInfo.userId || '0'}`}
					className={({ isActive }) => {
						return `mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`;
					}}>
					{({ isActive }) => {
						return (
							<>
								<Icon name={'profile'} color={isActive ? 'secondary' : 'light-gray'} colorType='stroke' />
								<span className={classNames('mobile-nav__link-label', { 'mobile-nav__link-label--active': isActive })}>Profile</span>
							</>
						);
					}}
				</NavLink>
			</li>
		</ul>
	);
};
