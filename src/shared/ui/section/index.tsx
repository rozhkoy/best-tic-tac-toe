import { SectionProps } from './types';
import './styles.scss';
import classNames from 'classnames';

export const Section: React.FC<SectionProps> = ({ children, title, className }) => {
	return (
		<section className={classNames('section', className)}>
			<h2 className="section__heading">{title}</h2>
			{children}
		</section>
	);
};
