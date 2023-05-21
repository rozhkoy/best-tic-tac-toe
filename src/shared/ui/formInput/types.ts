import { ChangeHandler, FieldError } from 'react-hook-form';

export interface FormInputProps {
	className?: string;
	placeholder: string;
	register: { onChange: ChangeHandler; onBlur: ChangeHandler; name: string; ref: React.Ref<any> };
	error: FieldError | undefined;
	touched: boolean | undefined;
	type: 'text' | 'password';
}
