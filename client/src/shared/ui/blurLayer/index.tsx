import classNames from 'classnames';
import { BlurLayerProps } from './types';
import './styles.scss';

export const BlurLayer: React.FC<BlurLayerProps> = ({ className, children }) => {
	const classes = classNames('blur-layer', className);
	return <div className={classes}>{children}</div>;
};
