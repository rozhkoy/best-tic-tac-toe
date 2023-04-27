import { FieldCell } from 'shared/ui/fieldCell';
import './styles.scss';

export const PlayFiled = () => {
	return (
		<div className="play-field">
			<FieldCell highlight={false} symbolName="cross" />
			<FieldCell highlight={true} symbolName="cross" />
			<FieldCell highlight={true} symbolName="cross" />
			<FieldCell highlight={true} symbolName="cross" />
			<FieldCell highlight={true} symbolName={'nought'} />
			<FieldCell highlight={true} symbolName="cross" />
			<FieldCell highlight={true} symbolName={'nought'} />
			<FieldCell highlight={true} symbolName="cross" />
			<FieldCell highlight={true} symbolName={'nought'} />
		</div>
	);
};
