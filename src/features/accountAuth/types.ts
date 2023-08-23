import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IGetUserInfoByUid {
	uid: string;
}

export type RegistrationInfoFieldsTypes = 'uid' | 'nickname' | 'settingsCode';

export interface IUserResponse {
	userId: number;
	uid: string;
	nickname: string;
	rating: number;
	settingCode: string;
	role: string;
	isActive: boolean;
	status: UserStatusTypes;
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
