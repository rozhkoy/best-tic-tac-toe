import { Button } from '@/shared/ui/button';
import './styles.scss';
import { useFirebaseAuth } from '../..';

export const SignInWith = () => {
	const { googleAuth, githubAuth } = useFirebaseAuth();

	return (
		<div className='sign-in-with'>
			<div className='sign-in-with__title'>Or</div>
			<div className='sign-in-with__btns-box'>
				<Button onClick={googleAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Continue with Google'} icon={'google'} type={'button'} />
				<Button onClick={githubAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Continue with Github'} icon={'github'} type={'button'} />
			</div>
		</div>
	);
};
