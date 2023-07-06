import classNames from 'classnames';
import { Icon } from '../icon';
import { SearchBarProps } from './types';
import './styles.scss';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className, variant = 'secondary' }) => {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange(e.currentTarget.value);
	}

	return (
		<div className={classNames('search-bar', className, `search-bar--${variant}`)}>
			<input value={value} onChange={handleChange} placeholder="Fined friends" className="search-bar__input" type="text" />
			<Icon className="search-bar__icon" name={'search'} />
		</div>
	);
};
