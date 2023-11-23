import classNames from 'classnames';
import './styles.scss';
import { SkeletonItemProps } from './types';

export const SkeletonItem: React.FC<SkeletonItemProps> = ({ className, height, width }) => {
	return <div style={{ width, height }} className={classNames('skeleton-item', className)} />;
};
