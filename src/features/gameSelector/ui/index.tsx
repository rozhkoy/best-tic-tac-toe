import { CustomRadio } from 'shared/ui/CustomRadio';
import './styles.scss';
import { Devider } from 'shared/ui/devider';
import { Button } from 'shared/ui/button';

export const GameSelector = () => {
	return (
		<div className="game-selector">
			<div className="game-option">
				<div className="game-option__heading">Number of players</div>
				<CustomRadio fields={['1p', '2p', 'online']} />
			</div>
			<div className="game-option">
				<div className="game-option__heading">Hard level</div>
				<CustomRadio disabled={true} fields={['Ease', 'Normal', 'Hard']} />
			</div>
			<Devider />
			<Button size={'medium'} variant={'primary'} fullWidth={true} title={'Start'} type={'button'} />
		</div>
	);
};
