import classNames from 'classnames';
import { PropsWithClassName } from 'shared/types/propsWithClassName';
import './style.scss';

export const Devider: React.FC<PropsWithClassName> = ({ className }) => {
	return <div className={classNames('devider', className)}></div>;
};
