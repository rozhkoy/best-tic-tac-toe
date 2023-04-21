import { PropsWithChildren } from 'react';
import logo from './assets/logo.svg';
import classNames from 'classnames';
import { LogoProps } from './types';

export const Logo: React.FC<LogoProps> = ({ className }) => {
	const classes = classNames('logo', className);
	return (
		<div className={classes}>
			<img width={110} height={24} src={logo} alt="logo" className="logo__img" />
		</div>
	);
};
