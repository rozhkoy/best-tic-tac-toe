import { CustomLink } from '@/shared/ui/customLink';
import './styles.scss';

export const AuthBtnsHeader = () => {
	return (
		<div className="auth-btns-header">
			<CustomLink className="auth-btns-header__btn" variant={'default'} size={'tiny'} fullWidth={false} title={'Sign in'} to={'/sign-in'} />
			<CustomLink className="auth-btns-header__btn" variant={'border'} size={'medium'} fullWidth={false} title={'Sign up'} to={'/sign-up'} />
		</div>
	);
};
