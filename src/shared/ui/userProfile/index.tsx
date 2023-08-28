import { Avatar } from '../avatar';
import { UserStatus } from '../userStatus';
import { UserProfileProps } from './types';
import './styles.scss';

export const UserProfile: React.FC<UserProfileProps> = ({ size, alt, nickname, status, src }) => {
	return (
		<div className="user-profile">
			<Avatar className="user-profile__avatar" size={size} alt={alt} src={src} />
			<div className="user-profile__info">
				<div className={`user-profile__nickname user-profile__nickname--${size}`}>{nickname}</div>
				<UserStatus className="user-profile__status" status={status} />
			</div>
		</div>
	);
};
