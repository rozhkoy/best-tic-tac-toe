import logo from './assets/logo.svg';
import classNames from 'classnames';
import { LogoProps } from './types';
import { Link } from 'react-router-dom';
import { routes } from 'app/provider/routes';

export const Logo: React.FC<LogoProps> = ({ className }) => {
	const classes = classNames('logo', className);
	return (
		<Link to={routes.HOME} className={classes}>
			<img width={110} height={24} src={logo} alt="logo" className="logo__img" />
		</Link>
	);
};
