import { ChangeHandler, ControllerRenderProps, FieldError, FieldPathValue, Noop, RefCallBack } from 'react-hook-form';

export interface FormInputProps {
	className?: string;
	placeholder: string;
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
	error?: FieldError | undefined;
	touched: boolean | undefined;
	type: 'text' | 'password';
}
