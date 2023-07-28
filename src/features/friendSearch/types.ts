import { IPagination } from '@/shared/types/IPagination';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { IUserResponse } from '../accountAuth/types';

export interface IFriend {
	nickname: string;
	status: UserStatusTypes;
	img: string;
}

export interface ISearchUsersByNickname extends IPagination {
	query: string;
	userId: number;
}

export interface IGetAllRequestsForFriendship extends IPagination {
	userId: number;
}

export type SearchModeTypes = 'Your friends' | 'Friends requests' | 'Global Search';

export type SearchModeProp = Array<SearchModeTypes>;

export interface IFriendResponse extends IUserResponse {
	userFriend: {
		friendId: string;
		userId: string;
		friendUserId: string;
		status: string;
	};
}
