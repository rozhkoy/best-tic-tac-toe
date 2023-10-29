export interface InviteToGameNotifsProps {
	src: string;
	nickname: string;
	userId: string;
	friendId: string;
	isVisible: boolean;
	id: string;
}

export interface IAcceptInviteToGame {
	friendId: string;
}
