import { IPagination } from '@/shared/types/IPagination';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';
import { IPartialUserInfo } from '../accountAuth/types';
import { IPaginationResponse } from '@/shared/types/findAndCount';
import { UseMutationResult } from '@tanstack/react-query';

export interface IFriend {
	nickname: string;
	status: UserStatusTypes;
	img: string;
}

export interface ISearchUsersByNickname extends IPagination {
	query: string;
	userId: string;
}

export interface IGetAllRequestsForFriendship extends IPagination {
	query: string;
	userId: string;
}

export type SearchModeTypes = 'Friends' | 'Requests' | 'Search';

export type SearchModeProp = Array<SearchModeTypes>;

export interface IPartialUserInfoWithBtnsStatus extends IPartialUserInfo {
	btnsStatus: FrindshipBtnsStatusTypes;
	invitationId?: string | null;
}

export interface ListOfUserResponse extends IPartialUserInfo {
	btnsStatus: FrienshipStatusTypes;
	invitationId?: string | null;
}

export type FrienshipStatusTypes = null | 'FRIEND' | 'INVITATION_TO_FRIENDS' | 'PENDING';

export type FrindshipBtnsStatusTypes = FrienshipStatusTypes | 'LOADING' | 'ERROR' | 'INVITED_TO_GAME';

export interface IPaginationInfo {
	page: number;
	item: number;
}

export interface IButtonsIds {
	userId: string;
	invitationId?: string | null;
}

export interface ListOfUsersProps {
	list: Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	children: (status: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo, userStatus: UserStatusTypes) => React.ReactNode;
}

export interface IUseFriendsActionsResponse {
	sendInviteToGame: (friendId: string, userId: string, paginationInfo?: IPaginationInfo) => boolean;
	sendRejectionInviteToGame: (friendId: string, userId: string) => boolean;
	sendDeclineInviteToGame: (friendId: string, userId: string) => boolean;
}

export interface IRejectionInviteToGame {
	friendId: string;
}

export interface ISendInviteToGame {
	friendId: string;
	paginationInfo?: IPaginationInfo;
}
