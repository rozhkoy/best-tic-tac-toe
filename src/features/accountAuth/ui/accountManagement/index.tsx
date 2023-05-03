import { Link } from 'react-router-dom';
import './styles.scss';

export const AccountManagement = () => {
	return (
		<div className="account-management">
			<Link to={'/create-an-account'} className="account-management__link">
				Create an account
			</Link>
			<Link to={'forgot-password'} className="account-management__link">
				Forgot password
			</Link>
		</div>
	);
};
