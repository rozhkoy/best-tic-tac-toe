import { PropsWithClassName } from '@/shared/types/propsWithClassName';
import { Dispatch, SetStateAction } from 'react';

export interface SearchInputProps extends PropsWithClassName {
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
}
