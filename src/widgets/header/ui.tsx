import { UserPanel } from '@/entities/user';
import './styles.scss';
import { Logo } from '@/shared/ui/logo';
import { Navbar } from '@/features/navigation';
import { AuthBtnsHeader } from '@/features/accountAuth';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { MobileNotifsBtn } from '@/features/notifications/ui/mobileNotifsBtn';
import { Button } from '@/shared/ui/button';
import { toggleSettingsVisible } from '@/features/settings/store';

export const Header = () => {
	const userState = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	return (
		<div className='header'>
			<div className='header__side-panel'>
				<Logo className='header__logo' />
				<Navbar />
			</div>
			{userState.isAuth ? (
				<>
					<div className='header__btns-group'>
						<Button
							className='header__settings-btn'
							onClick={() => dispatch(toggleSettingsVisible())}
							icon={'settings'}
							size={'default'}
							variant={'default'}
							fullWidth={false}
							type={'button'}
						/>

						<MobileNotifsBtn />
					</div>

					<UserPanel url={userState.url} nickname={userState.nickname} rating={userState.rating} />
				</>
			) : (
				<AuthBtnsHeader />
			)}
		</div>
	);
};
