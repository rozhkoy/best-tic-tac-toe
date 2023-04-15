import classNames from 'classnames';
import { ButtonProps } from './types';
import './styles.scss';
import { Icon } from '../Icons';

export const Button: React.FC<ButtonProps> = (props) => {
	const className = classNames('button', props.className, props.variant, props.size, {
		'full-width': props.fullWidth,
		'with-icon': !!props.icon,
	});
	return (
		<button className={className}>
			{props.icon && <Icon name={props.icon} />}
			<span className="button__label">{props.title}</span>
		</button>
	);
};
