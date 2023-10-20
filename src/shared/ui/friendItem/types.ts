import { UserStatusTypes } from '../userStatus/types';

export interface FriendItemProps {
	children: React.ReactNode;
	variant: FrienditemVariantTypes;
	src: string;
	status: UserStatusTypes;
	nickname: string;
	userId: string;
}

export type FrienditemVariantTypes = 'primary' | 'secondary';
