import { CustomRadio } from '@/shared/ui/CustomRadio';
import { Avatar } from '@/shared/ui/avatar';
import { BlurLayer } from '@/shared/ui/blurLayer';
import { Button } from '@/shared/ui/button';
import { Devider } from '@/shared/ui/devider';
import { Icon } from '@/shared/ui/icon';

import './styles.scss';
import { useEffect, useState } from 'react';
import { themeTypes } from '../types';

export const Settings = () => {
	const [theme, setTheme] = useState<themeTypes>('auto');

	function changeTheme(newTheme: themeTypes) {
		setTheme(newTheme);
		if (newTheme !== 'auto') document.body.className = `${newTheme}-theme`;
		localStorage.setItem('theme', newTheme);
	}

	useEffect(() => {
		setTheme((localStorage.getItem('theme') as themeTypes) ?? 'auto');
	}, []);

	return (
		<BlurLayer className='settings'>
			<div className='settings__window' title='Settings'>
				<h2 className='settings__heading'> Settings</h2>
				<button className='settings__close'>
					<Icon name={'close'} />
				</button>
				<div className='settings__profile-info'>
					<Avatar src={''} className={'settings__avatar'} />
					<input value={'nickname'} type='text' className='settings__nickname' />
				</div>
				<Devider />
				<div className='settings__themes'>
					<div className='settings__theme-heading'>
						<Icon name={'moon'} className={'settings__theme-heading-icon'} />
						<span className={'settings__theme-heading-text'}>Themes</span>
					</div>
					<CustomRadio fields={['dark', 'light', 'auto'] as Array<themeTypes>} value={theme} onChange={changeTheme} />
				</div>
				<Devider />
				<Button size={'medium'} variant={'primary'} fullWidth={true} type={'button'} icon={'logout'} title={'Log out'} />
			</div>
		</BlurLayer>
	);
};
