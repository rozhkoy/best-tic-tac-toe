import { PropsWithChildren } from 'react';

export interface FormWrapProps extends PropsWithChildren {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}
