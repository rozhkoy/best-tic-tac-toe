import classNames from 'classnames';
import './styles.scss';
import { CustomRadioProps } from './types';
import { useEffect, useId, useState } from 'react';

export const CustomRadio: React.FC<CustomRadioProps> = ({ className, fields, disabled, value, onChange }) => {
	const classes = classNames('custom-radio', className, { disabled });
	const [id, setId] = useState<string>(useId());

	function radioHandler(event: React.ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value);
		console.log(value);
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
