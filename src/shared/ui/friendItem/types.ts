import { AvatarSizeTypes } from '../avatar/types';
import { UserStatusTypes } from '../userStatus/types';

export interface FriendItemProps {
	children: React.ReactNode;
	variant: FrienditemVariantTypes;
	src: string;
	status: UserStatusTypes;
	nickname: string;
	userId: string;
}

export interface FriendItemSkeletonProps {
	variant: FrienditemVariantTypes;
	size: AvatarSizeTypes;
}

export type FrienditemVariantTypes = 'primary' | 'secondary';
