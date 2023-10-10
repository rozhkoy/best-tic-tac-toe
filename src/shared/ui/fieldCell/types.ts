export interface FieldCellProps {
	symbolName: SymbolTypes;
	highlight: boolean;
	markCell: (index: number) => void;
	index: number;
	blockMove?: boolean;
}

export interface ICellData {
	id: string;
	symbol: SymbolTypes;
	highlight: boolean;
}

export type SymbolTypes = 'cross' | 'nought' | 'empty';
