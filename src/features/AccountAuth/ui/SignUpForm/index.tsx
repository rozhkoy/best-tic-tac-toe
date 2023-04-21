import { withFormik } from 'formik';
import { SignUpFormProps } from './types';
import { FormWrap } from 'shared/ui/formWrap';
import { FormInput } from 'shared/ui/formInput';
import { Button } from 'shared/ui/button';

const SingUpTemplateForm = () => {
	return (
		<FormWrap>
			<FormInput name={'name'} placeholder={'Name'} type={'text'} />
			<FormInput name={'email'} placeholder={'Email'} type={'text'} />
			<FormInput name={'password'} placeholder={'Password'} type={'password'} />
			<FormInput
				name={'confirmPassword'}
				placeholder={'Confirm password'}
				type={'password'}
			/>
			<Button
				className={''}
				size={'medium'}
				variant={'primary'}
				fullWidth={true}
				title={'Sign up'}
				type={'submit'}
			/>
		</FormWrap>
	);
};

export const SignUpForm = withFormik<SignUpFormProps, SignUpFormProps>({
	mapPropsToValues: () => {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	},
	handleSubmit: (values) => {
		console.log(values);
	},
})(SingUpTemplateForm);
