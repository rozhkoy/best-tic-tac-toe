import { AvatarProps } from '../avatar/types';
import { UserStatusTypes } from '../userStatus/types';

export interface UserProfileProps extends AvatarProps {
	nickname: string;
	status: UserStatusTypes;
	userId?: string;
	rating?: number;
}
