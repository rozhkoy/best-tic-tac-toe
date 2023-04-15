import { PropsWithChildren } from 'react';
export interface ContainerProps extends PropsWithChildren {
	size: 'large' | 'medium' | 'small';
}
