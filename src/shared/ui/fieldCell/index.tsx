import { CrossSybmol, NoughtSybmol } from './assets';
import { FieldCellProps, SymbolTypes } from './types';
import './styles.scss';

const symbols: Record<SymbolTypes, React.ReactNode> = {
	nought: <NoughtSybmol />,
	cross: <CrossSybmol />,
};

export const FieldCell: React.FC<FieldCellProps> = ({ symbolName }) => {
	return <div className="field-cell">{symbols[symbolName]}</div>;
};
