import { FormInput } from '../../../../shared/ui/formInput/index';
import { FormWrap } from '@/shared/ui/formWrap';
import { withFormik } from 'formik';
import { SignInInputsProps } from './types';
import { Button } from '@/shared/ui/button';

const SignInTemplateForm = () => {
	return (
		<FormWrap>
			<FormInput type={'text'} name={'email'} placeholder={'Email'} />
			<FormInput type={'password'} name={'password'} placeholder={'Password'} />
			<Button className={''} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign in'} type={'submit'} />
		</FormWrap>
	);
};

export const SignInForm = withFormik<SignInInputsProps, SignInInputsProps>({
	mapPropsToValues: () => {
		return {
			email: '',
			password: '',
		};
	},
	handleSubmit: (values) => {
		console.log(values);
	},
})(SignInTemplateForm);
