import { GameInfo } from 'features/playGround/ui/gameInfo';
import { Layout } from 'shared/ui/layout';
import { PlayFiled } from '../../features/playGround/ui/playField/index';
import './styles.scss';
import { Button } from 'shared/ui/button';

export const Session = () => {
	return (
		<Layout className="session">
			<div className="session__container">
				<GameInfo />
				<PlayFiled />
				<Button size={'medium'} variant={'primary'} fullWidth={false} title={'Play again'} type={'button'} icon={'restart'} />
			</div>
		</Layout>
	);
};
