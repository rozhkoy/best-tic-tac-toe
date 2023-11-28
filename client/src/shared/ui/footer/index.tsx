import { Container } from '../container';
import './styles.scss';

export const Footer = () => {
	return (
		<footer className='footer'>
			<Container withPadding={true} size={'extra-large'} className='footer__container'>
				<div className='footer__copyright-text'>© 2023 best tic-tac-toe. All Rights Reserved.</div>
				<div className='footer__app-version'>beta 1.0.0</div>
			</Container>
		</footer>
	);
};
