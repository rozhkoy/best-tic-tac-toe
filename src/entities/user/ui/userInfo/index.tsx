import './styles.scss';
import avatarPng from './assets/avatar.png';
import { UserInfoProps } from '../../types';
import { Rating } from '@/shared/ui/rating';

export const UserPanel: React.FC<UserInfoProps> = ({ nickname, rating }) => {
	return (
		<div className='user-panel'>
			<div className='user-panel__info'>
				<div className='user-panel__nickname'>{nickname}</div>
				<Rating number={rating} />
			</div>
			<div className='user-panel__avatar-box'>
				<img src={avatarPng} width={64} height={64} alt='avatar' className='user-panel__avatar' />
			</div>
		</div>
	);
};
