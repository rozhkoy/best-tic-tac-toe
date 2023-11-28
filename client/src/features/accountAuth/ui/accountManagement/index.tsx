import { Link } from 'react-router-dom';
import './styles.scss';
import { routes } from '@/app/provider/routes';

export const AccountManagement = () => {
	return (
		<div className='account-management'>
			<Link to={`${routes.ACCOUNTS}/${routes.SIGN_UP}`} className='account-management__link'>
				Create an account
			</Link>
			<Link to={'/'} className='account-management__link'>
				Forgot password
			</Link>
		</div>
	);
};
