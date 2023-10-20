import { CrossSybmol, NoughtSybmol } from './assets';
import { FieldCellProps, SymbolTypes } from './types';
import './styles.scss';
import classNames from 'classnames';

const symbols: Record<SymbolTypes, React.ReactNode> = {
	nought: <NoughtSybmol />,
	cross: <CrossSybmol />,
	empty: <></>,
};

export const FieldCell: React.FC<FieldCellProps> = ({ symbolName, highlight, markCell, index, blockMove = false }) => {
	return (
		<div
			onClick={() => {
				if (!blockMove) markCell(index);
			}}
			className={classNames('field-cell', `field-cell--${symbolName}`, {
				'field-cell--nought-active': highlight && symbolName === 'nought',
				'field-cell--cross-active': highlight && symbolName === 'cross',
			})}>
			{symbols[symbolName]}
		</div>
	);
};
