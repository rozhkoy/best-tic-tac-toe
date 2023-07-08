import { UserProfile } from '../userProfile';
import { FriendItemProps } from './types';
import './styles.scss';
import classNames from 'classnames';

export const FriendItem: React.FC<FriendItemProps> = ({ children, nickname, status, src, variant }) => {
	return (
		<li className={classNames('friend-item', `friend-item--${variant}`)}>
			<UserProfile size="small" className="friend-item__user-profile" nickname={nickname} status={status} src={src} />
			<div className="friend-item__btns">{children}</div>
		</li>
	);
};
