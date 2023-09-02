import classNames from 'classnames';
import { ButtonProps } from './types';
import './styles.scss';
import { Icon } from '../icon';

export const Button: React.FC<ButtonProps> = (props) => {
	const className = classNames('button', props.className, props.variant, props.size, {
		'full-width': props.fullWidth,
		'with-gap': !!props.icon && !!props.title,
	});
	return (
		<button disabled={props.disabled ?? false} type={props.type} className={className} onClick={props.onClick}>
			{props.icon && <Icon name={props.icon} />}
			{props.title && <span className="button__label">{props.title}</span>}
		</button>
	);
};
