import { FC, ChangeEvent } from 'react';
import classNames from 'classnames';
import { ToggleBtnProps } from './types';
import './styles.scss';

export const ToggleBtn: FC<ToggleBtnProps> = ({ className, value, onChange, name, disabled }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.checked);
	};
	return (
		<label
			className={classNames(className, 'toggle-btn', {
				'toggle-btn--active': value,
				'toggle-btn--disabled': disabled,
			})}>
			<input className="toggle-btn__input" type="checkbox" checked={value} onChange={handleChange} disabled={disabled} name={name} />
		</label>
	);
};
