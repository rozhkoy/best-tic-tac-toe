import { PropsWithChildren } from 'react';
import { Logo } from '../Logo';
import decor from './assets/decor.svg';
import './styles.scss';
import { Container } from '../Container';

export const AuthFrame: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="auth-frame">
			<div className="auth-frame__content-box">
				<Container size={'large'}>
					<div className="auth-frame-header">
						<div className="auth-frame-header__logo">
							<Logo />
						</div>
					</div>
					<div className="auth-frame__wrap">{children}</div>
				</Container>
			</div>
			<div className="auth-frame__decor">
				<img
					src={decor}
					alt="decor"
					width={'806'}
					height={'900'}
					className="auth-frame__decor-img"
				/>
			</div>
		</div>
	);
};
