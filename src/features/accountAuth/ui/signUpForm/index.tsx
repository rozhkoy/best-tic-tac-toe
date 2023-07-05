import { SignUpFormProps } from './types';
import { FormWrap } from '@/shared/ui/formWrap';
import { Button } from '@/shared/ui/button';
import { ObjectSchema, object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '@/shared/ui/formInput';
import { ref } from 'yup';

export const SignUpForm = () => {
	const signUpSchema: ObjectSchema<SignUpFormProps> = object().shape({
		name: string().required('Required').min(2, 'Too short!').max(20, 'Too long!'),
		email: string().email('Invalid email').required('Required'),
		password: string().min(2, 'Too short!').max(50, 'Too long!').required('Required'),
		confirmPassword: string()
			.required('Required')
			.oneOf([ref('password')], 'The fields must be the same'),
	});

	type FormDataTypes = yup.InferType<typeof signUpSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		trigger,
	} = useForm<FormDataTypes>({
		mode: 'onBlur',
		resolver: yupResolver(signUpSchema),
	});



	const formHanler = (data: FormDataTypes) => console.log(data);
	return (
		<FormWrap onSubmit={handleSubmit(formHanler)}>
			<FormInput {...register('name')} placeholder={'Name'} error={errors.name} type={'text'} touched={touchedFields.name} />
			<FormInput {...register('email')} placeholder={'Email'} error={errors.email} type={'text'} touched={touchedFields.email} />
			<FormInput {...register('password')} placeholder={'Password'} error={errors.password} type={'password'} touched={touchedFields.password} />
			<FormInput {...register('confirmPassword')} placeholder={'Confirm password'} error={errors.confirmPassword} type={'password'} touched={touchedFields.confirmPassword} />
			<Button className={''} size={'medium'} variant={'primary'} fullWidth={true} title={'Sign Up'} type={'submit'} />
		</FormWrap>
	);
};
