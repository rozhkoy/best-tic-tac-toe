export const websocketEventNames: Record<string, string> = {
	TEST_CONNECTION: 'TEST_CONNECTION',
	UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
	UPDATE_GAME_STATE: 'UPDATE_GAME_STATE',
	SEND_INVITE_TO_FRIENDSHIP: 'SEND_INVITE_TO_FRIENDSHIP',
	INVITE_TO_GAME: 'INVITE_TO_GAME',
	INVITE_TO_GAME_IS_ACCEPTED: 'INVITE_TO_GAME_IS_ACCEPTED',
	INVITATION_TO_GAME_HAS_BEEN_SENT: 'INVITATION_TO_GAME_HAS_BEEN_SENT',
	INVITE_TO_GAME_IS_CANCELLED: 'INVITE_TO_GAME_IS_DECLINE',
	USER_IS_NOT_ONLINE: 'USER_IS_NOT_ONLINE',
	SYNC_GAME_STATE: 'SYNC_GAME_STATE',
	SYNC_PLAYGROUND: 'SYNC_PLAYGROUND',
	READY_STATE_TO_GAME: 'READY_STATE_TO_GAME',
	START_GAME: 'START_GAME',
	DATA_ABOUT_OPONENT: 'DATA_ABOUT_OPONENT',
	RESET_GAME_STATE: 'RESET_GAME_STATE',
	WINNER_FIND: 'WINNER_FIND',
	GAME_OVER: 'GAME_OVER',
};