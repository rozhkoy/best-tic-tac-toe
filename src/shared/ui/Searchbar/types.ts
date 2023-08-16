import { PropsWithClassName } from '@/shared/types/propsWithClassName';

export interface SearchBarProps extends PropsWithClassName {
	value: string;
	onChange: (value: string) => void;
}
