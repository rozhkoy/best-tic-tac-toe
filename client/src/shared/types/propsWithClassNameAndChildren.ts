import { PropsWithChildren } from 'react';

export interface PropsWithClassNameAndChildren extends PropsWithChildren {
	className?: string;
}
