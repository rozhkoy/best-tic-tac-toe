import { SignUpFormProps } from './types';
import { FormWrap } from 'shared/ui/formWrap';
import { FormInput } from 'shared/ui/formInput';
import { Button } from 'shared/ui/button';
import { useFirebaseAuth } from 'features/accountAuth/lib/useFirebaseAuth';
import { ObjectSchema, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { error } from 'console';

export const SignUpForm = () => {
	const signUpSchema: ObjectSchema<SignUpFormProps> = object({
		name: string().required('Required').min(2, 'Too short!').max(20, 'Too long!'),
		email: string().required('Required').email('Invalid email'),
		password: string().required('Required').min(2, 'Too short!').max(50, 'Too long!'),
		confirmPassword: string().required('Required').min(2, 'Too short!').max(50, 'Too long!'),
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
	const { createAccount } = useFirebaseAuth(() => {
		console.log('test');
	});

	const formHanler = (data: FormDataTypes) => console.log(data);

	return (
		<FormWrap onSubmit={handleSubmit(formHanler)}>
			<FormInput register={{ ...register('name') }} placeholder={'Name'} type={'text'} error={errors.name} touched={touchedFields.name} />
			<FormInput register={{ ...register('email') }} placeholder={'Email'} type={'text'} error={errors.email} touched={touchedFields.email} />
			<FormInput register={{ ...register('password') }} placeholder={'Password'} type={'password'} error={errors.password} touched={touchedFields.password} />
			<FormInput register={{ ...register('confirmPassword') }} placeholder={'Confirm password'} type={'password'} error={errors.confirmPassword} touched={touchedFields.confirmPassword} />
			<Button className={''} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign up'} type={'submit'} />{' '}
		</FormWrap>
	);
};
