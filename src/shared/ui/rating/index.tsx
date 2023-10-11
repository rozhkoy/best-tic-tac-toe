import { FC } from 'react';
import { RatingProps } from './types';
import { Icon } from '../icon';
import './styles.scss';

export const Rating: FC<RatingProps> = ({ number }) => {
	return (
		<div className='rating'>
			<Icon name={'cup'} className={'rating__icon'} />
			<span className='rating__number'>{number}</span>
		</div>
	);
};
