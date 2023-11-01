import { CrossSybmol, NoughtSybmol } from './assets';
import { FieldCellProps, SymbolTypes } from './types';
import './styles.scss';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

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
			<CSSTransition timeout={300} in={symbolName !== 'empty'} classNames='opacity'>
				{symbols[symbolName]}
			</CSSTransition>
		</div>
	);
};
