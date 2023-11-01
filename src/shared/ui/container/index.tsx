import { ContainerProps } from './types';
import './styles.scss';
import classNames from 'classnames';

export const Container: React.FC<ContainerProps> = ({ children, size, className, withPadding = false }) => {
	const classes = classNames('container', className, `container--${size}`, { 'container--with-padding': withPadding });
	return <div className={classes}>{children}</div>;
};
