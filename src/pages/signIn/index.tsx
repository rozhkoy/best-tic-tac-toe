import { AccountManagement, SignInWith } from 'features/accountAuth';
import { SignInForm } from 'features/accountAuth/ui/signInForm/lib';
import { AuthFrame } from 'shared/ui/authFrame';
import { Container } from 'shared/ui/container';
import { FormHeader } from 'shared/ui/formHeader';

export const SignIn = () => {
	return (
		<AuthFrame>
			<Container size="medium">
				<FormHeader heading={'Welcome'} subHeading={'Glad to see you!'} />
				<SignInForm email={''} password={''} />
				<AccountManagement />
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
