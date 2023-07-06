

import { UserProfileProps } from "../userProfile/types";

export interface FriendItemProps extends UserProfileProps {
    children: React.ReactNode ;
    variant: FrienditemVariantTypes;
}

export type FrienditemVariantTypes = 'primary' | 'secondary'