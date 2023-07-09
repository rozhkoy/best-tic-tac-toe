import { PropsWithClassNameAndChildren } from '@/shared/types/propsWithClassNameAndChildren';
import classNames from 'classnames';
import './styles.scss';

export const ListWrap: React.FC<PropsWithClassNameAndChildren> = ({ children, className }) => {
	return <ul className={classNames('list-wrap', className)}>{children}</ul>;
};
