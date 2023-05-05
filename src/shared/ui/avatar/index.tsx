import classNames from 'classnames';
import { avatarProps } from './types';
import './styles.scss';

const SIZES = {
	small: 42,
	medium: 64,
	big: 100,
};

export const Avatar: React.FC<avatarProps> = ({ size = 'medium', alt = 'avatar', src }) => {
	const classes = classNames('avatar', `avatar--${size}`);

	return <img className={classes} alt={alt} src={src} width={SIZES[size]} height={SIZES[size]} />;
};
