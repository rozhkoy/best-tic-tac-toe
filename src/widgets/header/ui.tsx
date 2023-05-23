import { UserPanel } from '@/entities/user';
import './styles.scss';
import { Logo } from '@/shared/ui/logo';
import { Navbar } from '@/features/navigation';

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
