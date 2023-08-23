import { FormInputProps } from './types';
import './styles.scss';
import classNames from 'classnames';
import { forwardRef } from 'react';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ placeholder, type, className, error, onChange, onBlur, name }, ref) => {
	return (
		<div className="form-input">
			<input
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				ref={ref}
				className={classNames('form-input__input', className, { 'form-input__input--error': !!error?.message })}
				placeholder={placeholder}
				type={type}
			/>

			<div className="form-input__error">{error?.message}</div>
		</div>
	);
});
