import { IPagination } from '@/shared/types/IPagination';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { IPartialUserInfo } from '../accountAuth/types';

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
	query: string;
	userId: number;
}

export type SearchModeTypes = 'Your friends' | 'Friends requests' | 'Global Search';

export type SearchModeProp = Array<SearchModeTypes>;

export interface IPartialUserInfoWithFriendshipStatus extends IPartialUserInfo {
	friendshipStatus: FrienshipStatusTypes;
}

export interface IGetAllRequestsForFriendshipResponse extends IPartialUserInfoWithFriendshipStatus {
	invitationId: string;
}

export type FrienshipStatusTypes = null | 'friend' | 'invitation' | 'pending';
