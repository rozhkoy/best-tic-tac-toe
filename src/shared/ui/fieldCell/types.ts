export interface FieldCellProps {
	symbolName: SymbolTypes;
	highlight: boolean;
	markCell: (index: number) => void;
	index: number;
}

export type SymbolTypes = 'cross' | 'nought' | 'empty';
