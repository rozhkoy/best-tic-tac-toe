import { Button } from 'shared/ui/Button';
import './styles.scss';

export const SignInWith = () => {
	return (
		<div className="sign-in-with">
			<div className="sign-in-with__title">Or sign in with</div>
			<div className="sign-in-with__btns-box">
				<Button
					onClick={() => alert('test')}
					className={'sign-in-with__btn'}
					size={'medium'}
					variant={'primary'}
					fullWidth={true}
					title={'Sign in with Google'}
					icon={'google'}
					type={'button'}
				/>
				<Button
					onClick={() => alert('test')}
					className={'sign-in-with__btn'}
					size={'medium'}
					variant={'primary'}
					fullWidth={true}
					title={'Sign in with Facebook'}
					icon={'facebook'}
					type={'button'}
				/>
			</div>
		</div>
	);
};
