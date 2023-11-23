import { CustomRadio } from '@/shared/ui/CustomRadio';
import { Avatar } from '@/shared/ui/avatar';
import { BlurLayer } from '@/shared/ui/blurLayer';
import { Button } from '@/shared/ui/button';
import { Devider } from '@/shared/ui/devider';
import { Icon } from '@/shared/ui/icon';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';
import { useEffect, useState } from 'react';
import { themeTypes } from '../types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { toggleSettingsVisible } from '../store';
import { useFirebaseAuth } from '@/features/accountAuth';
import { updateTheme } from '@/features/theme';

export const Settings = () => {
	const settings = useAppSelector((state) => state.settings);
	const userInfo = useAppSelector((state) => state.user);
	const { signOutAccount } = useFirebaseAuth();
	const dispatch = useAppDispatch();
	const [theme, setTheme] = useState<themeTypes>('auto');

	function changeTheme(newTheme: themeTypes) {
		setTheme(newTheme);
		if (newTheme !== 'auto') {
			document.body.className = `${newTheme}-theme`;
			dispatch(updateTheme(newTheme));
		}
		localStorage.setItem('theme', newTheme);
	}

	function logOut() {
		signOutAccount();
		dispatch(toggleSettingsVisible());
	}

	useEffect(() => {
		setTheme((localStorage.getItem('theme') as themeTypes) ?? 'auto');
	}, []);

	return (
		<CSSTransition timeout={300} in={settings.isVisible} classNames='opacity' unmountOnExit>
			<BlurLayer className='settings'>
				<div className='settings__window' title='Settings'>
					<h2 className='settings__heading'> Settings</h2>
					<Button size={'default'} variant={'default'} className='settings__close' icon='close' fullWidth={false} type={'button'} onClick={() => dispatch(toggleSettingsVisible())}></Button>
					{/* <button className='settings__close' onClick={() => dispatch(toggleSettingsVisible())}>
						<Icon name={'close'} />
					</button> */}
					<div className='settings__profile-info'>
						<Avatar src={userInfo.url ?? ''} className={'settings__avatar'} />
						<input value={userInfo.nickname} onChange={() => console.log('')} type='text' className='settings__nickname' />
					</div>
					<Devider />
					<div className='settings__themes'>
						<div className='settings__theme-heading'>
							<Icon name={'moon'} className={'settings__theme-heading-icon'} color={'secondary'} />
							<span className={'settings__theme-heading-text'}>Themes</span>
						</div>
						<CustomRadio fields={['dark', 'light', 'auto'] as Array<themeTypes>} value={theme} onChange={changeTheme} />
					</div>
					<Devider />

					<Button size={'medium'} variant={'primary'} fullWidth={true} type={'button'} icon={'logout'} title={'Log out'} onClick={logOut} />
				</div>
			</BlurLayer>
		</CSSTransition>
	);
};
