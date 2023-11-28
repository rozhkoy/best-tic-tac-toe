import { PropsWithChildren } from 'react';

export interface PrivateRoutesProps extends PropsWithChildren {
	redirectPath: string;
	isAllow: boolean;
}
