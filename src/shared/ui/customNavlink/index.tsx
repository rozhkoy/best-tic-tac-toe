import classNames from 'classnames';
import { CustomLinkProps } from './types';
import { useLocation, useNavigate } from 'react-router-dom';

export const CustomNavLink: React.FC<CustomLinkProps> = ({ className, children, isBlock, to, onWarning }) => {
	const location = useLocation();
	const locationPathname = location.pathname.toLowerCase();
	const isActive = locationPathname === to;

	const navigate = useNavigate();

	function onClickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
		e.preventDefault();
		if (isActive) {
			return;
		}
		if (isBlock) {
			onWarning(to);
		} else {
			navigate(to);
		}
	}

	return (
		<a onClick={(e) => onClickHandler(e)} href={to} className={classNames('custom-nav-link', className(isActive))}>
			{children}
		</a>
	);
};
