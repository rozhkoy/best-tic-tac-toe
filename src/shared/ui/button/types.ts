import { IconNamesTypes } from '../icon/types';
import { PropsWithClassNameAndChildren } from '@/shared/types/propsWithClassNameAndChildren';

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

export interface CustomButtonProps extends PropsWithClassNameAndChildren {
	onClick?: () => void;
	size?: 'tiny' | 'medium' | 'large' | 'default';
	variant?: 'primary' | 'secondary' | 'warning' | 'default';
	fullWith?: boolean;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	withGap?: boolean;
}
