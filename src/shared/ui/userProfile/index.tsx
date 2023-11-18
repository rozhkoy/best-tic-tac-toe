import { Avatar, AvatarSkeleton } from '../avatar';
import { UserStatus } from '../userStatus';
import { UserProfileProps, UserProfileSkeletonProps } from './types';
import './styles.scss';
import { Link } from 'react-router-dom';
import { routes } from '@/app/provider/routes';
import { Rating } from '../rating';
import classNames from 'classnames';
import { SkeletonItem } from '../skeletonItem';

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

export const UserProfileSkeleton: React.FC<UserProfileSkeletonProps> = ({ size, rating = false }) => {
	return (
		<div className='user-profile'>
			<AvatarSkeleton className='user-profile__avatar' size={size} />
			<div className={classNames('user-profile__info', 'user-profile__info--with-skeleton-gap')}>
				<SkeletonItem width={100} height={16} />
				{rating && <SkeletonItem width={70} height={20} />}
				<SkeletonItem className='user-profile__status' width={50} height={12} />
			</div>
		</div>
	);
};
