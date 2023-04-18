import { AccountManagement, SignInWith } from 'features/AccountAuth';
import { SignInForm } from 'features/AccountAuth/ui/SignInForm/lib';
import { AuthFrame } from 'shared/ui/AuthFrame';
import { Container } from 'shared/ui/Container';

export const SignIn = () => {
	return (
		<AuthFrame>
			<Container size="medium">
				<SignInForm email={''} password={''} />
				<AccountManagement />
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
