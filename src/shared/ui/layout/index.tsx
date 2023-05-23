import classNames from 'classnames';
import './styles.scss';
import { PropsWithClassNameAndChildren } from '@/shared/types/propsWithClassNameAndChildren';

export const Layout: React.FC<PropsWithClassNameAndChildren> = ({ children, className }) => {
	return <div className={classNames('layout', className)}>{children}</div>;
};
