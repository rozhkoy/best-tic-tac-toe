import { UserPanel } from '@/entities/user';
import './styles.scss';
import { Logo } from '@/shared/ui/logo';
import { Navbar } from '@/features/navigation';
import { AuthBtnsHeader } from '@/features/accountAuth';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const Header = () => {
	const userState = useAppSelector((state) => state.user);
	return (
		<div className="header">
			<div className="header__side-panel">
				<Logo className="header__logo" />
				<Navbar />
			</div>
			{userState.isAuth ? <UserPanel /> : <AuthBtnsHeader />}
		</div>
	);
};
