import { CrossSybmol, NoughtSybmol } from './assets';
import { FieldCellProps, SymbolTypes } from './types';
import './styles.scss';
import classNames from 'classnames';

const symbols: Record<SymbolTypes, React.ReactNode> = {
	nought: <NoughtSybmol />,
	cross: <CrossSybmol />,
};

export const FieldCell: React.FC<FieldCellProps> = ({ symbolName, highlight }) => {
	return <div className={classNames('field-cell', { 'field-cell--nought-active': highlight && symbolName === 'nought', 'field-cell--cross-active': highlight && symbolName === 'cross' })}>{symbols[symbolName]}</div>;
};
