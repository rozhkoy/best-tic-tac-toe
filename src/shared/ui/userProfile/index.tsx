import { Avatar } from '../avatar';
import { UserStatus } from '../userStatus';
import { UserProfileProps } from './types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { routes } from '@/app/provider/routes';
import { Rating } from '../rating';
import classNames from 'classnames';

export const UserProfile: React.FC<UserProfileProps> = ({ size, alt, nickname, status, src, userId, rating }) => {
	return (
		<div className='user-profile'>
			<Avatar className='user-profile__avatar' size={size} alt={alt} src={src} />
			<div className={classNames('user-profile__info', { 'user-profile__info--with-gap': rating })}>
				{userId ? (
					<Link to={`${routes.USER}/${userId} `} className={`user-profile__nickname user-profile__nickname--${size}`}>
						{nickname}
					</Link>
				) : (
					<div className={`user-profile__nickname user-profile__nickname--${size}`}>{nickname}</div>
				)}

				{rating && <Rating number={rating} />}
				<UserStatus className='user-profile__status' status={status} />
			</div>
		</div>
	);
};
