import classNames from 'classnames';
import './styles.scss';
import { NothingProps } from './types';

export const Nothing: React.FC<NothingProps> = ({ hideForDesktop = false }) => {
	return <div className={classNames('nothing', { 'nothing--hide-for-desktop': hideForDesktop })}>Nothing</div>;
};
