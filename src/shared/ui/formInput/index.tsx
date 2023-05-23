import { FormInputProps } from './types';
import './styles.scss';
import { Icon } from './../icon/index';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

export const FormInput: React.FC<FormInputProps> = ({ className, type, register, placeholder, touched, error }) => {
	const [isError, setIsError] = useState(false);
	const [highlightInput, setHighlightInput] = useState(false);
	const [isTransition, setIsTransition] = useState(false);

	useEffect(() => {
		console.log(error, touched);
		let isErrorTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {}, 1000);
		let isTransitionTimeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {}, 300);
		if (error?.message && touched) {
			setIsError(true);
			setHighlightInput(true);
			isTransitionTimeoutId = setTimeout(() => {
				setIsTransition(true);
				isErrorTimeoutId = setTimeout(() => {
					setIsError(false);
					setIsTransition(false);
				}, 400);
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
			<input {...register} className={classNames('form-input__input', className, { 'form-input__input--error': highlightInput })} placeholder={placeholder} type={type} />

			{isError && touched ? (
				<div className={classNames('form-input__error', { 'form-input__error--transtion': isTransition })}>
					<Icon name="info" className="form-input__error-icon" />
					<span className="form-input__error-text">{error?.message}</span>
				</div>
			) : null}
		</div>
	);
};
