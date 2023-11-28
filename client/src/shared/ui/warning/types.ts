export interface WarningPopupProps {
	heading: string;
	text: string;
	onYes: () => void;
	onNo: () => void;
}
