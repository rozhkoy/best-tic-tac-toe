import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CustomLinkProps } from './types';
import './styles.scss';

export const CustomLink: React.FC<CustomLinkProps> = ({ variant, size, fullWidth, title, className, to }) => {
	return (
		<Link className={classNames('custom-link', className, `custom-link--${variant}`, `custom-link--${size}`, { 'full-width': fullWidth })} to={to}>
			{title}
		</Link>
	);
};
