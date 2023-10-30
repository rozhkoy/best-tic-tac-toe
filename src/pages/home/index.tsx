import { WarningPopup } from '@/shared/ui/warning';
import './style.scss';
import { GameSelector } from '@/features/gameSelector';

export const Home = () => {
	return (
		<div className='home'>
			<div className='home__container'>
				<GameSelector />
			</div>
		</div>
	);
};
