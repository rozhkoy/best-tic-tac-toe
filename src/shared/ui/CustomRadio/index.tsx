import classNames from 'classnames';
import './styles.scss';
import { CustomRadioProps } from './types';
import { useId, useState } from 'react';

export const CustomRadio = <ArrayFields extends Array<string>, CurrentField>({ className, fields, disabled, value, onChange }: CustomRadioProps<ArrayFields, CurrentField>) => {
	const classes = classNames('custom-radio', className, { disabled });
	const [id, setId] = useState<string>(useId());

	function radioHandler(event: React.ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value as CurrentField);
	}

	return (
		<div className={classes}>
			{fields.map((item) => (
				<div key={item} className={classNames('custom-radio__item', { disabled })}>
					<input onChange={radioHandler} name={id} id={item} type="radio" className="custom-radio__radio" value={item} checked={value === item && !disabled} disabled={disabled} />
					<label htmlFor={item} className={classNames('custom-radio__label', { disabled })}>
						{item}
					</label>
				</div>
			))}
		</div>
	);
};
