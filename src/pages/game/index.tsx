import { GameSelector } from '@/features/gameSelector';
import { BlurLayer } from '@/shared/ui/blurLayer';

export const Game = () => {
	return (
		<BlurLayer>
			<GameSelector />
		</BlurLayer>
	);
};
