import { UserProfile } from '../userProfile';
import { FriendItemProps } from './types';
import './styles.scss';
import classNames from 'classnames';
import { forwardRef } from 'react';

export const FriendItem = forwardRef<HTMLLIElement, FriendItemProps>(({ children, nickname, status, src, variant, userId }, ref) => {
	return (
		<li ref={ref} className={classNames('friend-item', `friend-item--${variant}`)}>
			<UserProfile userId={userId} size='small' className='friend-item__user-profile' nickname={nickname} status={status} src={src} />
			<div className='friend-item__btns'>{children}</div>
		</li>
	);
});
