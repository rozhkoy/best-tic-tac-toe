import classNames from 'classnames';
import { Icon } from '../icon';
import { SearchBarProps } from './types';
import './styles.scss';
import { ChangeEvent } from 'react';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className }) => {
	function handelChange(e: ChangeEvent<HTMLInputElement>) {
		onChange(e.currentTarget.value);
	}

	return (
		<div className={classNames('search-bar', className)}>
			<input value={value} onChange={handelChange} placeholder="Fined friends" className="search-bar__input" type="text" />
			<Icon className="search-bar__icon" name={'search'} />
		</div>
	);
};
