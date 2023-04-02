import { Button } from '../../shared/ui/Button';
import { Icon } from '../../shared/ui/Icons';

export const Home = () => {
	return (
		<div className="home">
			<Icon iconName="facebook" />
			<Button
				onClick={() => alert('test')}
				className={''}
				size={'medium'}
				variant={'primary'}
				fullWidth={true}
				title="Login"
			/>
			<Button
				onClick={() => alert('test')}
				className={''}
				size={'medium'}
				variant={'primary'}
				fullWidth={true}
				icon={<Icon iconName="google" />}
				title="Sign in with Google"
			/>
			<Button
				onClick={() => alert('test')}
				className={''}
				size={'tiny'}
				variant={'secondary'}
				fullWidth={false}
				title="Denined"
			/>
			<Button
				onClick={() => alert('test')}
				className={''}
				size={'medium'}
				variant={'warning'}
				fullWidth={true}
				title={'No'}
			/>
		</div>
	);
};
