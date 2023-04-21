import { UserPanel } from 'entities/User';
import './styles.scss';
import { Logo } from 'shared/ui/Logo';
import { Navbar } from 'features/Navigation';

export const Header = () => {
	return (
		<div className="header">
			<div className="header__side-panel">
				<Logo className="header__logo" />
				<Navbar />
			</div>
			<UserPanel />
		</div>
	);
};
