import { ContainerProps } from './types';
import './styles.scss';
import classNames from 'classnames';

export const Container: React.FC<ContainerProps> = ({ children, size, className }) => {
	const classes = classNames('container', className, size);
	return <div className={classes}>{children}</div>;
};
