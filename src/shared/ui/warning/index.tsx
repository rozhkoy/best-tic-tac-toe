import { BlurLayer } from '../blurLayer';
import { Button } from '../button';
import { WarningPopupProps } from './types';
import './styles.scss';

export const WarningPopup: React.FC<WarningPopupProps> = ({ heading, onNo, onYes, text }) => {
	return (
		<BlurLayer className='blur-layer__warnign-pop-up'>
			<div className='warning-pop-up'>
				<h2 className='warning-pop-up__heading'>{heading}</h2>
				<div className='warning-pop-up__text'>{text}</div>
				<div className='warning-pop-up__btns'>
					<Button size={'medium'} variant={'default'} fullWidth={true} type={'button'} title='Yes' onClick={onYes} />
					<Button size={'medium'} variant={'warning'} fullWidth={true} type={'button'} title='No' onClick={onNo} />
				</div>
			</div>
		</BlurLayer>
	);
};
