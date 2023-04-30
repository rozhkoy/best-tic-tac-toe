export interface FieldCellProps {
	symbolName: SymbolTypes;
	highlight: boolean;
	markCell: (index: number) => void;
	index: number;
}

export interface ICellData {
	symbol: SymbolTypes;
	highlight: boolean;
}

export type SymbolTypes = 'cross' | 'nought' | 'empty';
