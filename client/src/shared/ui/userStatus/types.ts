import { PropsWithClassName } from '@/shared/types/propsWithClassName';

export interface UserStatusProps extends PropsWithClassName {
	status: UserStatusTypes;
}

export type UserStatusTypes = 'ONLINE' | 'OFFLINE' | 'PLAYING';
