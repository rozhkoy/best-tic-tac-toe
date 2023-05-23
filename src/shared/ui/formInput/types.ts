import { ChangeHandler, FieldError, FieldPathValue, Noop, RefCallBack } from 'react-hook-form';

export interface FormInputProps {
	className?: string;
	placeholder: string;
	// register: { onChange: ChangeHandler; onBlur: ChangeHandler; name: string; ref: RefCallBack };
	onChange: (...event: any[]) => void;
	onBlur: Noop;
	value: string;
	name: string;
	ref: RefCallBack;
	error: FieldError | undefined;
	touched: boolean | undefined;
	type: 'text' | 'password';
}
