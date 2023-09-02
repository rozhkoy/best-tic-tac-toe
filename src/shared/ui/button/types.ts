import { IconNamesTypes } from '../icon/types';

export interface ButtonProps {
	onClick?: () => void;
	className?: string;
	size: 'tiny' | 'medium' | 'default';
	variant: 'primary' | 'secondary' | 'warning' | 'default';
	fullWidth: boolean;
	icon?: IconNamesTypes;
	title?: string;
	type: 'button' | 'submit';
	disabled?: boolean;
}
