import classNames from 'classnames';
import { ToggleBtnProps } from './types';
import './styles.scss';

export const ToggleBtn: React.FC<ToggleBtnProps> = ({ className, value, onChange, name, disabled }) => {
	return (
		<label
			className={classNames(className, 'toggle-btn', {
				'toggle-btn--active': value,
				'toggle-btn--disabled': disabled,
			})}>
			<input className="toggle-btn__input" type="checkbox" checked={value} onChange={onChange} disabled={disabled} name={name} />
		</label>
	);
};
