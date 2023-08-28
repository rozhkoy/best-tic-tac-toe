import { IPagination } from '@/shared/types/IPagination';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IGetProfileInfoByUserId {
	userId: number;
	currentUserId: number;
}

export interface IGetGameHistoryByUserId extends IPagination {
	userId: number;
}

export interface IProfileInfoByUserIdResponse {
	userInfo: {
		nickname: string;
		status: UserStatusTypes;
	};
	stats: {
		wins: number;
		draws: number;
		losses: number;
	};
	friendshiptResponse: boolean;
}
