import { PropsWithChildren } from 'react';

export interface ContainerProps extends PropsWithChildren {
	size: 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
	className?: string;
	withPadding?: boolean;
}
