import classNames from 'classnames';
import { UserStatusProps } from './types';
import './styles.scss';

export const UserStatus: React.FC<UserStatusProps> = ({ status, className }) => {
	return (
		<div className={classNames('user-status', className)}>
			<span className={classNames('user-status__dot', `user-status__dot--${status}`)}></span>
			<div className="user-status__status">{status}</div>
		</div>
	);
};
