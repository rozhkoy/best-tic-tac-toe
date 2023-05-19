import { AccountManagement, SignInWith } from 'features/accountAuth';
import { useFirebaseAuth } from 'features/accountAuth/lib/useFirebaseAuth';
import { SignInForm } from 'features/accountAuth/ui/signInForm/lib';
import { AuthFrame } from 'shared/ui/authFrame';
import { Container } from 'shared/ui/container';
import { FormHeader } from 'shared/ui/formHeader';

export const SignIn = () => {
	return (
		<AuthFrame>
			<Container size="small">
				<FormHeader heading={'Welcome'} subHeading={'Glad to see you!'} />
				<SignInForm email={''} password={''} />
				<AccountManagement />
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
