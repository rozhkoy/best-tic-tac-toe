import { FieldCell } from 'shared/ui/fieldCell';
import './styles.scss';
import { ICellData } from 'features/playGround/types';
import { useEffect, useState } from 'react';
import { SymbolTypes } from 'shared/ui/fieldCell/types';

export const PlayFiled = () => {
	const [currentBoardState, SetCurrentBoardState] = useState<Array<ICellData>>([
		{
			symbol: 'empty',
			highlight: false,
		},
		{
			symbol: 'empty',
			highlight: false,
		},
		{
			symbol: 'empty',
			highlight: false,
		},
		{
			symbol: 'empty',
			highlight: false,
		},
		{
			symbol: 'empty',
			highlight: false,
		},
		{
			symbol: 'empty',
			highlight: false,
		},
	]);
	const [currentSybmol, setCurrentSybmol] = useState<SymbolTypes>('cross');

	function resetBoardState(quantityCell: number) {
		console.log('render');
		const cellDataTemplate: ICellData = {
			symbol: 'empty',
			highlight: false,
		};

		let filledBoard: Array<ICellData> = [];

		for (let i = 0; i < quantityCell; i++) {
			filledBoard.push({ ...cellDataTemplate });
		}

		return filledBoard;
	}

	useEffect(() => {
		SetCurrentBoardState(resetBoardState(9));
	}, []);

	function markCell(index: number) {
		const boardState = currentBoardState.slice();
		console.log('click');
		if (boardState[index].symbol === 'empty') {
			console.log(boardState[index].symbol);
			boardState[index].symbol = currentSybmol;
			console.log(boardState);
			SetCurrentBoardState(boardState);
			if (currentSybmol === 'cross') {
				setCurrentSybmol('nought');
			} else {
				setCurrentSybmol('cross');
			}
		}
	}

	return (
		<div className="play-field">
			{currentBoardState.map((item, index) => {
				return <FieldCell key={index} highlight={item.highlight} markCell={markCell} index={index} symbolName={item.symbol} />;
			})}
		</div>
	);
};
