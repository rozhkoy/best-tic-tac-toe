import { SignUpFormProps } from './types';
import { FormWrap } from 'shared/ui/formWrap';
import { FormInput } from 'shared/ui/formInput';
import { Button } from 'shared/ui/button';
import { useFirebaseAuth } from 'features/accountAuth/lib/useFirebaseAuth';
import { Form, Formik } from 'formik';

export const SignUpForm = () => {
	const initialValues: SignUpFormProps = { name: '', email: '', password: '', confirmPassword: '' };
	const { createAccount } = useFirebaseAuth(() => {
		console.log('test');
	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ email, password, name }) => {
				createAccount(email, password, name);
			}}>
			<FormWrap>
				<FormInput name={'name'} placeholder={'Name'} type={'text'} />
				<FormInput name={'email'} placeholder={'Email'} type={'text'} />
				<FormInput name={'password'} placeholder={'Password'} type={'password'} />
				<FormInput name={'confirmPassword'} placeholder={'Confirm password'} type={'password'} />
				<Button className={''} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign up'} type={'submit'} />{' '}
			</FormWrap>
		</Formik>
	);
};
