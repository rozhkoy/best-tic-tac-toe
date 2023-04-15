export interface ButtonProps {
	onClick: () => void;
	className: string;
	size: 'tiny' | 'medium';
	variant: 'primary' | 'secondary' | 'warning';
	fullWidth: boolean;
	icon?: React.ReactNode;
	title: string;
}
