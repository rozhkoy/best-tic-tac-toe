import { ChangeHandler, FieldError } from 'react-hook-form';

export interface FormInputProps {
	className?: string;
	placeholder: string;
	onChange: ChangeHandler;
	onBlur?: ChangeHandler;
	name: string;
	error?: FieldError | undefined;
	type: 'text' | 'password' | 'email';
	autocomplete?: string;
}
