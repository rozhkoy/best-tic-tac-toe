import { Button } from '@/shared/ui/button';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { useFirebaseAuth } from '../..';
import { updateUserInfo } from '@/entities/user';

export const SignInWith = () => {
	// const navigate = useNavigate();
	// const dispatch = useAppDispatch();

	const { googleAuth, githubAuth, signOutAccount } = useFirebaseAuth();

	return (
		<div className="sign-in-with">
			<div className="sign-in-with__title">Or</div>
			<div className="sign-in-with__btns-box">
				<Button onClick={googleAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Continue with Google'} icon={'google'} type={'button'} />
				<Button onClick={githubAuth} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'Continue with Github'} icon={'github'} type={'button'} />
				<Button onClick={signOutAccount} className={'sign-in-with__btn'} size={'medium'} variant={'primary'} fullWidth={true} title={'sign out'} icon={'cross'} type={'button'} />
			</div>
		</div>
	);
};
