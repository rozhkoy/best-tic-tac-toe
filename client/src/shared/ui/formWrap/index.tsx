import './styles.scss';
import { FormWrapProps } from './types';

export const FormWrap: React.FC<FormWrapProps> = ({ children, onSubmit }) => {
	return (
		<form className="form-wrap" onSubmit={onSubmit}>
			{children}
		</form>
	);
};
