import { Section } from '@/shared/ui/section';
import './style.scss';

import { GameSelector } from '@/features/gameSelector';

import { PlayerSearchTimer } from '@/shared/ui/playerSearchTimer';
import { PlayerWaiting } from '@/shared/ui/playerWaiting';

export const Home = () => {
	return (
		<div className="home">
			<div className="home__container">
				<GameSelector />

				<PlayerSearchTimer cancelhandler={() => console.log('cancel')} timer={'1:23'} />
			</div>
		</div>
	);
};
