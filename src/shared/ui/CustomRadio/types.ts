import { Dispatch, SetStateAction } from 'react';
import { PropsWithClassName } from '@/shared/types/propsWithClassName';

export interface CustomRadioProps<ArrayFields, CurrentField> extends PropsWithClassName {
	fields: ArrayFields;
	disabled?: boolean;
	value: string;
	onChange: Dispatch<SetStateAction<CurrentField>>;
}
