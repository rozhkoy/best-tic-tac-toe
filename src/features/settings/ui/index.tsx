import { CustomRadio } from '@/shared/ui/CustomRadio';
import { Avatar } from '@/shared/ui/avatar';
import { BlurLayer } from '@/shared/ui/blurLayer';
import { Button } from '@/shared/ui/button';
import { Devider } from '@/shared/ui/devider';
import { Icon } from '@/shared/ui/icon';
import { Section } from '@/shared/ui/section';
import './styles.scss';

export const Settings = () => {
	return (
		<BlurLayer className='settings'>
			<Section className='settings__window' title='Settings'>
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
					<CustomRadio fields={['dark', 'light', 'auto']} value={''} onChange={() => console.log('')} />
				</div>
				<Devider />
				<Button size={'medium'} variant={'primary'} fullWidth={true} type={'button'} icon={'logout'} title={'Log out'} />
			</Section>
		</BlurLayer>
	);
};
