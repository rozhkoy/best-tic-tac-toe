import { avatarProps } from './types';
import './styles.scss';

const SIZES = {
	small: 42,
	medium: 64,
	big: 100,
};

export const Avatar: React.FC<avatarProps> = ({ size = 'medium', alt = 'avatar', src }) => {
	return <img className={`avatar avatar--${size}`} alt={alt} src={src} width={SIZES[size]} height={SIZES[size]} />;
};
