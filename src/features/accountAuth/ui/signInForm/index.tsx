import { ObjectSchema, object, ref, string } from 'yup';
import { SignInFormProps } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormWrap } from '@/shared/ui/formWrap';
import { FormInput } from '@/shared/ui/formInput';
import { Button } from '@/shared/ui/button';
import * as yup from 'yup';

export const SignInForm = () => {
	const signUpSchema: ObjectSchema<SignInFormProps> = object().shape({
		email: string().email('Invalid email').required('Required'),
		password: string().min(2, 'Too short!').max(50, 'Too long!').required('Required'),
	});

	type FormDataTypes = yup.InferType<typeof signUpSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<FormDataTypes>({
		mode: 'onBlur',
		resolver: yupResolver(signUpSchema),
	});

	const formHanler = (data: FormDataTypes) => console.log(data);
	return (
		<FormWrap onSubmit={handleSubmit(formHanler)}>
			<FormInput {...register('email')} placeholder={'Email'} error={errors.email} type={'email'} touched={touchedFields.email} />
			<FormInput {...register('password')} placeholder={'Password'} error={errors.password} type={'password'} touched={touchedFields.password} />
			<Button className={''} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign In'} type={'submit'} />
		</FormWrap>
	);
};
