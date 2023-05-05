import './styles.scss';
import { PropsWithChildren } from 'react';

export const PlayField: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className="play-field">{children}</div>;
};
