import { PropsWithChildren } from 'react';
import './styles.scss';

export const AppWrap: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className='app-wrap'>{children}</div>;
};
