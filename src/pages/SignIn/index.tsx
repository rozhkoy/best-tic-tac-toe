import { AccountManagement, SignInWith } from 'features/AccountAuth';
import { SignInForm } from 'features/AccountAuth/ui/SignInForm/lib';
import { AuthFrame } from 'shared/ui/AuthFrame';
import { Container } from 'shared/ui/Container';
import { FormHeader } from 'shared/ui/FormHeader';

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
