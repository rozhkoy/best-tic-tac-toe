import { UserProfile } from '../userProfile';
import { FriendItemProps } from './types';
import './styles.scss';
import classNames from 'classnames';

export const FriendItem: React.FC<FriendItemProps> = ({ children, size, alt, nickname, status, src, variant }) => {
	return (
		<div className={classNames('friend-item', `friend-item--${variant}`)}>
			<UserProfile className="friend-item__user-profile" nickname={'nick name'} status={'online'} src={'./assets/avatar.png'} />
			{children}
		</div>
	);
};
