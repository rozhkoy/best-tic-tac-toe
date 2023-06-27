export interface IGetUserInfoByUid {
	uid: string;
}

// export interface IRegistrationUserInfo {
// 	[key: string]: string;
// 	uid: string;
// 	nickname: string;
// 	settingsCode: string;
// }

export type RegistrationInfoFieldsTypes = 'uid' | 'nickname' | 'settingsCode';

export interface IUserResponse {
	userId: string;
	uid: string;
	nickname: string;
	rating: number;
	settingCode: string;
	role: string;
	isActive: boolean;
}

export interface IUserSettingsResponse {
	userSettingId: string;
	userId: string;
	isSound: boolean;
	isMusic: boolean;
	theme: 'light' | 'dark' | 'auto';
}

export interface IRegistrationRespone {
	userResponse: IUserResponse;
	settingsResponse: IUserSettingsResponse;
}
