import classNames from 'classnames';
import './styles.scss';
import { CustomRadioProps } from './types';

export const CustomRadio: React.FC<CustomRadioProps> = ({ className, fields, disabled }) => {
	const classes = classNames('custom-radio', className, { disabled });
	return (
		<div className={classes}>
			{fields.map((item) => {
				return (
					<div key={item} className={classNames('custom-radio__item', { disabled })}>
						<input name="selector" id={item} type="radio" className="custom-radio__radio" disabled={disabled} />
						<label htmlFor={item} className={classNames('custom-radio__label', { disabled })}>
							{item}
						</label>
					</div>
				);
			})}
		</div>
	);
};
