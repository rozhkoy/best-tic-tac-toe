import { UserPanel } from 'entities/User';
import './styles.scss';

export const Header = () => {
	return (
		<div className="header">
			<UserPanel />
		</div>
	);
};
