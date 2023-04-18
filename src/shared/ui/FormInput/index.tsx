import { Field } from 'formik';
import { FormInputProps } from './types';
import './styles.scss';

export const FormInput: React.FC<FormInputProps> = ({ className, name, placeholder, type }) => {
	return (
		<Field
			id={name}
			placeholder={placeholder}
			name={name}
			className={`form-input ${className ?? ''}`}
			type={type}
		/>
	);
};
