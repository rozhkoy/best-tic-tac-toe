const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'My API',
		description: 'Description',
	},
	host: 'localhost:3000',
	basePath: '/',

	definitions: {
		RegistrationNewUser: {
			uid: 'string',
			nickname: 'nickname',
		},
		RegistrationNewUserResponse: {
			userId: '18',
			uid: 'sadf4sdf4x46ds85sg65df4g',
			nickname: 'nickname',
			rating: 1000,
			role: { '@enum': ['admin', 'user'] },
			status: { '@enum': ['online', 'offline', 'playing'] },
		},
		Error: {
			message: 'string',
		},
		GetUserInfoByUid: {
			uid: 'sadf4sdf4x46ds85sg65df4g',
		},
		GetUserInfoByUidResponse: {
			userId: '4',
			uid: 'sadf4sdf4x46ds85sg65df4g',
			nickname: 'nickname',
			rating: 1000,
			role: 'user',
			status: 'online',
			isActive: true,
		},
		GetProfileInfoByUserId: {
			userId: '1',
			targetUserId: '2',
		},
		GetProfileInfoByUserIdResponse: {
			userInfo: {
				nickname: 'nickname',
				status: 'offline',
				rating: 1000,
			},
			stats: {
				wins: 0,
				draws: 0,
				losses: 0,
			},
			friendshipResponse: {
				status: null,
			},
		},
		GetGameHistoryByUserIdResponse: {
			nextPage: 1,
			rows: [
				{
					userInfo: {
						userId: '32',
						nickname: 'nickname',
					},
					gameStatus: 'lost',
					winnerPlayerId: '32',
					gameHistoryId: '166',
					timestamp: '1700734491876',
				},
			],
		},
		getUsersByNicknameResponse: {
			nextPage: 1,
			rows: [
				{
					userId: '1',
					nickname: 'nickname',
					status: 'online',
					btnsStatus: { '@enum': [null, 'string'] },
				},
			],
			query: '',
		},
		acceptFriendshipInvite: {
			invitationId: '1',
		},
	},
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
	require('./index');
});
