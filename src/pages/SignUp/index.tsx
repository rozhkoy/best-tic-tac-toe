import { SignInWith } from 'features/AccountAuth';
import { SignUpForm } from 'features/AccountAuth/ui/SignUpForm';
import { AuthFrame } from 'shared/ui/AuthFrame';
import { Container } from 'shared/ui/Container';
import { FormHeader } from 'shared/ui/FormHeader';

export const SignUp = () => {
	return (
		<AuthFrame>
			<Container size={'medium'}>
				<FormHeader heading={'Create accaunt'} subHeading={'to get started now!'} />
				<SignUpForm name={''} email={''} password={''} confirmPassword={''} />
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
