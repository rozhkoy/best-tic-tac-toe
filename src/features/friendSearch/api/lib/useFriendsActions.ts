import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { sendAcceptFriendshipInvite, sendInviteToFriendship, sendRejectFriendshipInvite } from '..';
import { IPaginationInfo, IRejectionInviteToGame, ISendInviteToGame, IUseFriendsActionsResponse } from '../../types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';

export function useFriendsActions(): IUseFriendsActionsResponse {
	const webSocket = useContext(WebSocketContext);

	const sendInviteToFriendShipMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendInviteToFriendship(formData),
	});

	const acceptFriendshipInviteMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendAcceptFriendshipInvite(formData),
	});

	const rejectFriendshipInviteMutation = useMutation({
		mutationFn: async (formData: FormData) => await sendRejectFriendshipInvite(formData),
	});

	function sendInviteToGame(friendId: number, userId: number, paginationInfo: IPaginationInfo) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId,
			data: {
				friendId,
				paginationInfo,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
		return true;
	}

	function sendRejectionInviteToGame(friendId: number, userId: number) {
		const message: IWebSocketMessage<IRejectionInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_REJECTED,
			userId: userId,
			data: {
				friendId,
			},
		};

		webSocket?.instance.send(JSON.stringify(message));
		return true;
	}

	return { sendInviteToFriendShipMutation, acceptFriendshipInviteMutation, rejectFriendshipInviteMutation, sendInviteToGame, sendRejectionInviteToGame };
}
