import { SignInWith } from 'features/AccountAuth';
import { SignUpForm } from 'features/AccountAuth/ui/signUpForm';
import { AuthFrame } from 'shared/ui/authFrame';
import { Container } from 'shared/ui/container';
import { FormHeader } from 'shared/ui/formHeader';

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
