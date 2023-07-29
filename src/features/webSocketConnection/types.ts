import { ICellData } from '@/shared/ui/fieldCell/types';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IUpateGameStateData {
	playFiledState: Array<ICellData>;
}

export interface IUseWebsocketConectionReturn {
	udpateUserStatus: (status: UserStatusTypes) => void;
	sendGameState: (gameState: Array<ICellData>) => void;
	sendInviteToFriendShip: (invitationUserId: string) => void;
	sendInviteToGame: (friendId: string) => void;
	acceptInviteToGame: (friendId: string) => void;
}

export interface UseWebsocketConnecctionProps {
	updateGameState?: (gameState: Array<ICellData>) => void;
	showInviteToFriendship?: () => void;
	handleGameInvitationSent?: (friendId: string) => void;
	handleInviteToGameIsAccepted?: (sessionId: string) => void;
}

export interface ISendInviteToFriendship {
	invitationUserId: string;
}

export interface ISendInviteToGame {
	friendId: string;
}

export interface IAcceptInviteToGame {
	friendId: string;
}
