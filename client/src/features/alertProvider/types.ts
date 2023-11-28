export interface IAlertState {
	alerts: Array<IAlert>;
	currentAlert: IAlert;
}

export interface IAlert {
	alertId: string;
	isVisible: boolean;
	heading: string;
	text: string;
}
