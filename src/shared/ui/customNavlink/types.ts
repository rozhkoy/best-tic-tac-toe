import { PropsWithChildren } from 'react';

export interface CustomLinkProps extends PropsWithChildren {
	onWarning: (path: string) => void;
	isBlock: boolean;
	to: string;
	className: (isActive: boolean) => string;
}
