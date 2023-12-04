import { WebSocketContext } from '@/shared/providers/WebSocketProvider';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { sendAcceptFriendshipInvite, sendInviteToFriendship, sendRejectFriendshipInvite } from '../api';
import { IPaginationInfo, IRejectionInviteToGame, ISendInviteToGame, IUseFriendsActionsResponse } from '../types';
import { IWebSocketMessage } from '@/shared/types/webSocketMessage';
import { websocketEventNames } from '@/features/webSocketConnection/lib/websocketEventNames';

export function useFriendsActions(): IUseFriendsActionsResponse {
	const webSocket = useContext(WebSocketContext);

	const sendInviteToFriendShipMutation = useMutation({
		mutationFn: async ({ userId, formData }: { userId: string; formData: FormData }) => await sendInviteToFriendship(userId, formData),
	});

	const acceptFriendshipInviteMutation = useMutation({
		mutationFn: async (invitationId: string) => await sendAcceptFriendshipInvite(invitationId),
	});

	const rejectFriendshipInviteMutation = useMutation({
		mutationFn: async (invitationId: string) => await sendRejectFriendshipInvite(invitationId),
	});

	function sendInviteToGame(friendId: string, userId: string, paginationInfo?: IPaginationInfo) {
		const message: IWebSocketMessage<ISendInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME,
			userId,
			data: {
				friendId,
				paginationInfo,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		return true;
	}

	function sendRejectionInviteToGame(friendId: string, userId: string) {
		const message: IWebSocketMessage<IRejectionInviteToGame> = {
			event: websocketEventNames.INVITE_TO_GAME_IS_REJECTED,
			userId: userId,
			data: {
				friendId,
			},
			error: '',
		};

		webSocket?.send(JSON.stringify(message));
		return true;
	}

	return { sendInviteToFriendShipMutation, acceptFriendshipInviteMutation, rejectFriendshipInviteMutation, sendInviteToGame, sendRejectionInviteToGame };
}
