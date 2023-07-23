import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IFriend {
	nickname: string;
	status: UserStatusTypes;
	img: string;
}

export interface ISearchUsersByNickname {
	query: string;
	userId: number;
	page: number;
	perPage: number;
	limit: number;
}

export type SearchModeTypes = 'Your friends' | 'Friends requests' | 'Global Search';

export type SearchModeProp = Array<SearchModeTypes>;
