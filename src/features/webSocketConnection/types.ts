import { ICellData } from '@/shared/ui/fieldCell/types';
import { UserStatusTypes } from '@/shared/ui/userStatus/types';

export interface IUpateGameStateData {
	playFiledState: Array<ICellData>;
}

export interface IUseWebsocketConectionReturn {
	udpateUserStatus: (status: UserStatusTypes) => void;
	sendGameState: (gameState: Array<ICellData>) => void;
}

export interface UseWebsocketConnecctionProps {
	updateGameState?: (gameState: Array<ICellData>) => void;
}
