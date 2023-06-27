import { FormInputProps } from './types';
import './styles.scss';
import { Icon } from './../icon/index';
import classNames from 'classnames';
import { useState, useEffect, forwardRef, useRef, ForwardedRef } from 'react';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ placeholder, type, className, error, onChange, onBlur, name, touched }, ref) => {
	const [isError, setIsError] = useState(true);
	const [highlightInput, setHighlightInput] = useState(false);
	const [isTransition, setIsTransition] = useState(false);

	useEffect(() => {
		let isErrorTimeoutId: ReturnType<typeof setTimeout>;
		let isTransitionTimeoutId: ReturnType<typeof setTimeout>;
		if (error?.message && touched) {
			setIsError(true);
			setHighlightInput(true);
			isTransitionTimeoutId = setTimeout(() => {
				setIsTransition(true);
				isErrorTimeoutId = setTimeout(() => {
					setIsError(false);
					setIsTransition(false);
				}, 500);
			}, 700);
		} else {
			setIsError(false);
			setHighlightInput(false);
		}

		return () => {
			clearInterval(isErrorTimeoutId);
			clearInterval(isTransitionTimeoutId);
		};
	}, [error, touched]);

	return (
		<div className="form-input">
			<input
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				ref={ref}
				className={classNames('form-input__input', className, { 'form-input__input--error': highlightInput })}
				placeholder={placeholder}
				type={type}
			/>
			{isError && touched ? (
				<div className={classNames('form-input__error', { 'form-input__error--transtion': isTransition })}>
					<Icon name="info" className="form-input__error-icon" />
					<span className="form-input__error-text">{error?.message}</span>
				</div>
			) : null}
		</div>
	);
});
