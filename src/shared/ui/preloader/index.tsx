import { Icon } from '../icon';
import './styles.scss';

export const Preloader = () => {
	return (
		<div className='preloader'>
			<div className='preloader__container'>
				<div className='preloader__title'>Loading</div>
				<div className='preloader__icons'>
					<Icon className='preloader__icon' name={'cross'} />
					<Icon className='preloader__icon' name={'cross'} />
					<Icon className='preloader__icon' name={'nought'} />
					<Icon className='preloader__icon' name={'nought'} />
					<Icon className='preloader__icon' name={'cross'} />
					<Icon className='preloader__icon' name={'nought'} />
					<Icon className='preloader__icon' name={'cross'} />
				</div>
			</div>
		</div>
	);
};
