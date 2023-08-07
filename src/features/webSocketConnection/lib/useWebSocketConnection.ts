export function useWebSocketConnection() {
	// function udpateUserStatus(status: UserStatusTypes) {
	// 	const message: IWebSocketMessage<IUpdateUserStatusData> = {
	// 		event: websocketEventNames.UPDATE_USER_STATUS,
	// 		userId: userInfo.userId,
	// 		data: {
	// 			status,
	// 		},
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
	// function sendGameState(gameState: IGameState) {
	// 	const message: IWebSocketMessage<IGameState> = {
	// 		event: websocketEventNames.SYNC_GAME_STATE,
	// 		userId: userInfo.userId,
	// 		data: gameState,
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
	// function sendInviteToFriendShip(invitationUserId: string) {
	// 	const message: IWebSocketMessage<ISendInviteToFriendship> = {
	// 		event: websocketEventNames.SEND_INVITE_TO_FRIENDSHIP,
	// 		userId: userInfo.userId,
	// 		data: {
	// 			invitationUserId,
	// 		},
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
	// function sendInviteToGame(friendId: string) {
	// 	const message: IWebSocketMessage<ISendInviteToGame> = {
	// 		event: websocketEventNames.INVITE_TO_GAME,
	// 		userId: userInfo.userId,
	// 		data: {
	// 			friendId,
	// 		},
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
	// function acceptInviteToGame(friendId: string) {
	// 	console.log(friendId);
	// 	const message: IWebSocketMessage<IAcceptInviteToGame> = {
	// 		event: websocketEventNames.INVITE_TO_GAME_IS_ACCEPTED,
	// 		userId: userInfo.userId,
	// 		data: {
	// 			friendId,
	// 		},
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
	// function sendPlayfieldState(playfieldState: IPlayfieldState) {
	// 	const message: IWebSocketMessage<IPlayfieldState> = {
	// 		event: websocketEventNames.SYNC_GAME_STATE,
	// 		userId: userInfo.userId,
	// 		data: playfieldState,
	// 	};
	// 	websocketInstance.send(JSON.stringify(message));
	// }
}
