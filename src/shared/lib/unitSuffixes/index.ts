export function unitSuffixes(number: number): string {
	if (number >= 1_000_000_000) {
		const numberInString = String(number).split('');
		numberInString.splice(numberInString.length - 9, numberInString.length - 1);
		return `${numberInString.join('')}B`;
	} else if (number >= 1_000_000) {
		const numberInString = String(number).split('');
		numberInString.splice(numberInString.length - 6, numberInString.length - 1);
		return `${numberInString.join('')}M`;
	} else if (number >= 1_000) {
		const numberInString = String(number).split('');
		numberInString.splice(numberInString.length - 3, numberInString.length - 1);
		return `${numberInString.join('')}K`;
	}
	return `${number}`;
}
