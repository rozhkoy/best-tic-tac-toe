export interface InviteToGameNotifsProps {
	src: string;
	nickname: string;
	userId: number;
	friendId: number;
	isVisible: boolean;
	id: string;
}

export interface IAcceptInviteToGame {
	friendId: number;
}
