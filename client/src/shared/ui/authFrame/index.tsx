import { PropsWithChildren } from 'react';
import { Logo } from '../logo';
import lightDecor from './assets/light-decor.svg';
import darkDecor from './assets/dark-decor.svg';

import './styles.scss';
import { Container } from '../container';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

export const AuthFrame: React.FC<PropsWithChildren> = ({ children }) => {
	const theme = useAppSelector((state) => state.theme);
	console.log(theme.color);
	return (
		<div className='auth-frame'>
			<div className='auth-frame__content-box'>
				<Container className='auth-frame__container' size={'large'} withPadding={true}>
					<div className='auth-frame-header'>
						<div className='auth-frame-header__logo'>
							<Logo />
						</div>
					</div>
					<div className='auth-frame__wrap'>{children}</div>
				</Container>
			</div>
			<div className='auth-frame__decor'>
				{theme.color === 'light' ? (
					<img className='auth-frame__decor-img auth-frame__decor-img-light' alt='decor' src={lightDecor} />
				) : (
					<img className='auth-frame__decor-img auth-frame__decor-img-dark' alt='decor' src={darkDecor} />
				)}
			</div>
		</div>
	);
};
