import logo from './assets/logo.svg';

export const Logo = () => {
	return (
		<div className="logo">
			<img width={110} height={24} src={logo} alt="logo" className="logo__img" />
		</div>
	);
};
