import { GameSelector } from 'features/gameSelector';
import { BlurLayer } from 'shared/ui/blueLayer';

export const Game = () => {
	return (
		<BlurLayer>
			<GameSelector />
		</BlurLayer>
	);
};
