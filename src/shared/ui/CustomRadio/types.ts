import { PropsWithClassName } from 'shared/types/propsWithClassName';

export interface CustomRadioProps extends PropsWithClassName {
	fields: Array<string>;
	disabled?: boolean;
}
