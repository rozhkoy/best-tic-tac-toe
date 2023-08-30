import { IconNamesTypes } from '../icon/types';

export interface ButtonProps {
	onClick?: () => void;
	className?: string;
	size: 'tiny' | 'medium';
	variant: 'primary' | 'secondary' | 'warning';
	fullWidth: boolean;
	icon?: IconNamesTypes;
	title: string;
	type: 'button' | 'submit';
	disabled?: boolean;
}
