import classNames from 'classnames';
import { AvatarProps, AvatarSkeletonProps } from './types';
import './styles.scss';
import { SkeletonItem } from '../skeletonItem';

const SIZES = {
	small: 42,
	medium: 64,
	large: 100,
};

export const Avatar: React.FC<AvatarProps> = ({ size = 'medium', alt = 'avatar', src, className }) => {
	return <img className={classNames(`avatar avatar--${size}`, className)} alt={alt} src={src} width={SIZES[size]} height={SIZES[size]} />;
};

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({ size = 'medium', className }) => {
	return <SkeletonItem className={classNames('avatar', className)} width={SIZES[size]} height={SIZES[size]} />;
};
