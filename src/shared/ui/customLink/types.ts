import { PropsWithClassName } from '@/shared/types/propsWithClassName';

export interface CustomLinkProps extends PropsWithClassName {
	variant: 'border' | 'underline' | 'default';
	size: 'tiny' | 'medium';
	fullWidth: boolean;
	title: string;
	to: string;
}
