import './styles.scss';
import { AlertProps } from './types';

export const Alert: React.FC<AlertProps> = ({ heading, text }) => {
	return (
		<div className='alert'>
			<div className='alert__heading'>{heading}</div>
			<div className='alert__text'>{text}</div>
		</div>
	);
};
