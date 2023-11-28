import { Container } from '@/shared/ui/container';
import { Link } from 'react-router-dom';
import './styles.scss';
import { Icon } from '@/shared/ui/icon';

export const PageNotFound = () => {
	return (
		<div className='page-not-found'>
			<Container size={'small'} withPadding={true} className='page-not-found__container'>
				<h1 className='page-not-found__title'>
					<span className='page-not-found__title-letter page-not-found__title-letter--4'>4</span>
					<span className='page-not-found__title-letter page-not-found__title-letter--0'>0</span>
					<span className='page-not-found__title-letter page-not-found__title-letter--4'>4</span>
				</h1>
				<h2 className='page-not-found__subtitle'>Page not found</h2>
				<Link to={'/'} className='page-not-found__home-link'>
					Home
				</Link>
			</Container>
		</div>
	);
};
