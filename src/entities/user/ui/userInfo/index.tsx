import { Icon } from '@/shared/ui/icon';
import './styles.scss';
import avatarPng from './assets/avatar.png';
import { UserInfoProps } from '../../types';

export const UserPanel: React.FC<UserInfoProps> = ({ nickname, rating }) => {
	return (
		<div className="user-panel">
			<div className="user-panel__info">
				<div className="user-panel__nickname">{nickname}</div>
				<div className="user-panel__wins">
					<Icon name={'cup'} className={'user-panel__wins-icon'} />
					<span className="user-panel__wins-number">{rating}</span>
				</div>
			</div>
			<div className="user-panel__avatar-box">
				<img src={avatarPng} width={64} height={64} alt="avatar" className="user-panel__avatar" />
			</div>
		</div>
	);
};
