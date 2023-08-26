import { IPagination } from '@/shared/types/IPagination';

export interface IGetUserInfoByUserId {
	userId: number;
}

export interface IGetGameHistoryByUserId extends IPagination {
	userId: number;
}
