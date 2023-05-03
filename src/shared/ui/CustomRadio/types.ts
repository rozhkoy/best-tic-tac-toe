import { Dispatch, SetStateAction } from 'react';
import { PropsWithClassName } from 'shared/types/propsWithClassName';

export interface CustomRadioProps extends PropsWithClassName {
	fields: Array<string>;
	disabled?: boolean;
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
}
