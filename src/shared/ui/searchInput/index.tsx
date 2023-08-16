import classNames from 'classnames';
import { Icon } from '../icon';
import './styles.scss';
import { SearchInputProps } from './types';

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, className }) => {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange(e.currentTarget.value);
	}

	return (
		<div className={classNames('search-input', className)}>
			<input value={value} onChange={handleChange} placeholder="Fined friends" className="search-input__input" type="text" />
			<Icon className="search-input__icon" name={'search'} />
		</div>
	);
};
