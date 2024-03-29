import './styles.scss';
import { UserInfoProps } from '../../types';
import { Rating } from '@/shared/ui/rating';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { toggleSettingsVisible } from '@/features/settings/store';

export const UserPanel: React.FC<UserInfoProps> = ({ nickname, rating, url }) => {
	const dispatch = useAppDispatch();

	return (
		<div className='user-panel' onClick={() => dispatch(toggleSettingsVisible())}>
			<div className='user-panel__info'>
				<div className='user-panel__nickname'>{nickname}</div>
				<Rating number={rating} />
			</div>
			<div className='user-panel__avatar-box'>
				<img src={url} width={64} height={64} alt='avatar' className='user-panel__avatar' />
			</div>
		</div>
	);
};
