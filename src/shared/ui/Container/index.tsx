import { PropsWithChildren } from 'react';
import { ContainerProps } from './types';
import './styles.scss';

export const Container: React.FC<ContainerProps> = ({ children, size }) => {
	return <div className={`container ${size}`}>{children}</div>;
};
