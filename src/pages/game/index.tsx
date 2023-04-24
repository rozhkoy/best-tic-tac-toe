import { GameSelector } from 'features/gameSelector';
import { Outlet } from 'react-router-dom';
import { BlurLayer } from 'shared/ui/blurLayer';

export const Game = () => {
	return (
		<BlurLayer>
			<GameSelector />
		</BlurLayer>
	);
};
