import { SignInWith } from 'entities/AccountAuth/ui/SignInWith';
import { AuthFrame } from 'shared/ui/AuthFrame';
import { Container } from 'shared/ui/Container';

export const SignIn = () => {
	return (
		<AuthFrame>
			<Container size="medium">
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
