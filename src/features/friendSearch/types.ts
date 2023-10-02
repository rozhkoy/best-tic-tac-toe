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
	userId: number;
}

export interface IGetAllRequestsForFriendship extends IPagination {
	query: string;
	userId: number;
}

export type SearchModeTypes = 'Your friends' | 'Friends requests' | 'Global Search';

export type SearchModeProp = Array<SearchModeTypes>;

export interface IPartialUserInfoWithBtnsStatus extends IPartialUserInfo {
	btnsStatus: FriendItemBtnsStatusTypes;
	invitationId?: number | null;
}

export interface ListOfUserResponse extends IPartialUserInfo {
	btnsStatus: FrienshipStatusTypes;
	invitationId?: number | null;
}

export type FrienshipStatusTypes = null | 'friend' | 'invitation' | 'pending';

export type FriendItemBtnsStatusTypes = FrienshipStatusTypes | 'loading' | 'error' | 'invitedToGame';

export interface IPaginationInfo {
	page: number;
	item: number;
}

export interface IButtonsIds {
	userId: number;
	invitationId?: number | null;
}

export interface ListOfUsersProps {
	list: Array<IPaginationResponse<Array<IPartialUserInfoWithBtnsStatus>>>;
	children: (status: string | null, ids: IButtonsIds, paginationInfo: IPaginationInfo, userStatus: UserStatusTypes) => React.ReactNode;
}

interface sendInviteToFriendShipMutationData {
	invitationId: number;
}

export interface IUseFriendsActionsResponse {
	sendInviteToFriendShipMutation: UseMutationResult<sendInviteToFriendShipMutationData, unknown, FormData, unknown>;
	acceptFriendshipInviteMutation: UseMutationResult<boolean, unknown, FormData, unknown>;
	rejectFriendshipInviteMutation: UseMutationResult<boolean, unknown, FormData, unknown>;
	sendInviteToGame: (friendId: number, userId: number, paginationInfo: IPaginationInfo) => boolean;
	sendRejectionInviteToGame: (friendId: number, userId: number) => boolean;
}

export interface IRejectionInviteToGame {
	friendId: number;
}

export interface ISendInviteToGame {
	friendId: number;
	paginationInfo: IPaginationInfo;
}
