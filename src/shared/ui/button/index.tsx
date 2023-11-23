import classNames from 'classnames';
import { ButtonProps, CustomButtonProps } from './types';
import './styles.scss';
import { Icon } from '../icon';

// Component Button is deprecated, please use CustomButton
export const Button: React.FC<ButtonProps> = (props) => {
	const className = classNames('button', props.className, props.variant, props.size, {
		'full-width': props.fullWidth,
		'with-gap': !!props.icon && !!props.title,
	});
	return (
		<button disabled={props.disabled ?? false} type={props.type} className={className} onClick={props.onClick}>
			{props.icon && <Icon name={props.icon} />}
			{props.title && <span className='button__label'>{props.title}</span>}
		</button>
	);
};

export const CustomButton: React.FC<CustomButtonProps> = ({
	children,
	size = 'default',
	variant = 'default',
	onClick,
	fullWith = false,
	disabled = false,
	type = 'button',
	className,
	withGap = false,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classNames('custom-button', className, `custom-button--size-${size}`, `custom-button--variant-${variant}`, {
				'custom-button--full-widt': fullWith,
				'custom-button--with-gap': withGap,
			})}>
			{children}
		</button>
	);
};
