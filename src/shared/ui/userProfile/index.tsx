import { Avatar } from '../avatar';
import { UserStatus } from '../userStatus';
import { UserProfileProps } from './types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { routes } from '@/app/provider/routes';

export const UserProfile: React.FC<UserProfileProps> = ({ size, alt, nickname, status, src, userId }) => {
	return (
		<div className='user-profile'>
			<Avatar className='user-profile__avatar' size={size} alt={alt} src={src} />
			<div className='user-profile__info'>
				<Link to={`${routes.USER}/${userId} `} className={`user-profile__nickname user-profile__nickname--${size}`}>
					{nickname}
				</Link>

				<UserStatus className='user-profile__status' status={status} />
			</div>
		</div>
	);
};
