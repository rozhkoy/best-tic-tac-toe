import { Button } from '@/shared/ui/button';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

export const SignInWith = () => {
	const navigate = useNavigate();

	function facebookAuth(): void {
		throw new Error('Function not implemented.');
	}

	function googleAuth(): void {
		throw new Error('Function not implemented.');
	}

	return (
		<div className="sign-in-with">
			<div className="sign-in-with__title">Or</div>
			<div className="sign-in-with__btns-box">
				<Button onClick={googleAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign in with Google'} icon={'google'} type={'button'} />
				<Button onClick={facebookAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign in with Facebook'} icon={'facebook'} type={'button'} />
			</div>
		</div>
	);
};
