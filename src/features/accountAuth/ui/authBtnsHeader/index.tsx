import { CustomLink } from '@/shared/ui/customLink';
import './styles.scss';
import { routes } from '@/app/provider/routes';

export const AuthBtnsHeader = () => {
	return (
		<div className='auth-btns-header'>
			<CustomLink className='auth-btns-header__btn' variant={'default'} size={'tiny'} fullWidth={false} title={'Sign in'} to={`${routes.ACCOUNTS}/${routes.SIGN_IN}`} />
			<CustomLink className='auth-btns-header__btn' variant={'border'} size={'medium'} fullWidth={false} title={'Sign up'} to={`${routes.ACCOUNTS}/${routes.SIGN_UP}`} />
		</div>
	);
};
