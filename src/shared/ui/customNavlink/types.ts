import { PropsWithChildren } from 'react';

export interface CustomLinkProps extends PropsWithChildren {
	onWarning: (path) => void;
	isBlock: boolean;
	to: string;
	className: (isActive: boolean) => string;
}
