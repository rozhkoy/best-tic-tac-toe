import { FormHeaderProps } from './types';
import './styles.scss';

export const FormHeader: React.FC<FormHeaderProps> = ({ heading, subHeading }) => {
	return (
		<div className="form-header">
			<h1 className="form-header__header heading-h1">{heading}</h1>
			{subHeading && <h2 className="form-header__sub-heading heading-h2">{subHeading}</h2>}
		</div>
	);
};
