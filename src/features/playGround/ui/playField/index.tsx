import { FieldCell } from 'shared/ui/fieldCell';
import './styles.scss';

export const PlayFiled = () => {
	return (
		<div className="play-field">
			<FieldCell symbolName="cross" />
			<FieldCell symbolName="cross" />
			<FieldCell symbolName="cross" />
			<FieldCell symbolName="cross" />
			<FieldCell symbolName={'nought'} />
			<FieldCell symbolName="cross" />
			<FieldCell symbolName={'nought'} />
			<FieldCell symbolName="cross" />
			<FieldCell symbolName={'nought'} />
		</div>
	);
};
