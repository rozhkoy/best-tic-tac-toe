import { UserProfile, UserProfileSkeleton } from '../userProfile';
import { FriendItemProps, FriendItemSkeletonProps } from './types';
import './styles.scss';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { SkeletonItem } from '../skeletonItem';

export const FriendItem = forwardRef<HTMLLIElement, FriendItemProps>(({ children, nickname, status, src, variant, userId }, ref) => {
	return (
		<li ref={ref} className={classNames('friend-item', `friend-item--${variant}`)}>
			<UserProfile userId={userId} size='small' className='friend-item__user-profile' nickname={nickname} status={status} src={src} />
			<div className='friend-item__btns'>{children}</div>
		</li>
	);
});

export const FriendItemSkeleton: React.FC<FriendItemSkeletonProps> = ({ variant, size }) => {
	return (
		<li className={classNames('friend-item', `friend-item--${variant}`)}>
			<UserProfileSkeleton size={size} />
			<div className='friend-item__btns'>
				<SkeletonItem width={40} height={40} />
			</div>
		</li>
	);
};
