import { FrindshipBtnsStatusTypes } from '@/features/friendSearch/types';

import { IPagination } from '@/shared/types/IPagination';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IGetProfileInfoByUserId {
	userId: string;
	currentUserId: string;
}

export interface IGetGameHistoryByUserId extends IPagination {
	userId: string;
}

export interface IProfileInfoByUserIdResponse {
	userInfo: {
		nickname: string;
		status: UserStatusTypes;
		rating: number;
	};
	stats: {
		wins: number;
		draws: number;
		losses: number;
	};
	friendshipResponse: IProfileFriendshipBtns;
}

export interface IProfileFriendshipBtns {
	status: FrindshipBtnsStatusTypes;
	invitationId?: string;
}
