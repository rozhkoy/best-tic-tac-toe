const { users, gameHistories, userFriends } = require('../../database/models');
const { Op } = require('sequelize');
const { Sequelize } = require('../../database/databaseConection');
const userStatuses = require('../../constants/userStatuses');

class UserController {
	async registrationNewUser(req, res) {
		try {
			//  #swagger.auto = false

			const { uid, nickname } = req.body;
			/*
            #swagger.tags = ['User']
    
           	#swagger.parameters['uid'] = {
				in: 'query',
				required: true,
				schema: 'sadf4sdf4x46ds85sg65df4g',
			}
			#swagger.parameters['nickname'] = {
				in: 'query',
				required: true,
				schema: 'nickname',

			}
 			*/

			if (!(uid && nickname)) {
				/*
                #swagger.responses[400] = { 
                    description: 'Missing required query parameters',
                    schema: { "$ref": "#/definitions/Error" },
                }
                */
				return res.status(400).json({ message: 'Missing required query parameters' });
			}

			const registrationResponse = await users.create({
				uid: uid,
				nickname: nickname.length > 12 ? nickname.slice(0, 12) : nickname,
				rating: 1000,
				role: 'user',
				status: userStatuses.ONLINE,
				isActive: true,
			});

			if (!registrationResponse) {
				throw new Error('Error!. Failed to create new user');
			}

			/* 
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/RegistrationNewUserResponse" },
                description: "User registered successfully." }
            */

			return res.status(200).json({
				userId: registrationResponse.user_id,
				uid: registrationResponse.uid,
				nickname: registrationResponse.nickname,
				rating: registrationResponse.rating,
				status: registrationResponse.status,
				role: registrationResponse.role,
			});
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error",
            }
            */
			res.status(500).json({ message: e.message });
		}
	}

	async getUserInfoByUid(req, res) {
		try {
			//  #swagger.auto = false

			const { uid } = req.params;
			/*
            #swagger.tags = ['User']
			#swagger.parameters['userId'] = {
				in: 'params',
				required: true,
				schema: '1'
			}
            */
			if (!uid) {
				/*
                #swagger.responses[400] = { 
                    schema: { "$ref": "#/definitions/Error" },
                    description: 'Error!. Missing required query parameters',
                }
                */
				return res.status(400).json({ message: 'Error!. Missing required query parameters' });
			}

			const userResponse = await users.findOne({
				where: {
					uid: uid,
				},
			});

			if (!userResponse) {
				/*
                #swagger.responses[404] = { 
                    description: 'Error!. User not found',
                    schema: { "$ref": "#/definitions/Error" },
                }
                */
				return res.status(404).send({ message: 'User not found' });
			}

			const upateUserStatusResponse = await users.update({ status: 'online' }, { where: { user_id: userResponse.user_id } });

			if (!upateUserStatusResponse) {
				throw new Error('Error!. Failed to update user status');
			}
			/* 
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/GetUserInfoByUidResponse" },
                description: "User info by uid" }
            */
			return res.status(200).json({ nickname: userResponse.nickname, role: userResponse.role, status: userResponse.status, rating: userResponse.rating, userId: userResponse.user_id });
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error" }
            */
			res.status(500).json({ message: e.message });
		}
	}

	async getAllUser(req, res) {
		try {
			const { userId } = req.params;
			let { page, perPage, query = '' } = req.query;
			/*
			#swagger.auto = false
			#swagger.tags = ['User']
			#swagger.parameters['userId'] = {
				in: 'params',
				required: true,
				schema: '1'
			}
            #swagger.parameters['page'] = {
                in: 'query',
                required: true,
                schema: '1',
            }
           
            #swagger.parameters['perPage'] = {
                in: 'query',
                required: true,
                schema: '10',
            }

			#swagger.parameters['query'] = {
				in: 'query',
				required: true,
				schema: 'query',
			}
			*/

			if (page < 0 || !page) {
				page = 0;
			}

			if (perPage <= 0 || !perPage) {
				perPage = 10;
			}

			const offset = page * perPage;

			let listOfUser = await users.findAndCountAll({
				where: {
					nickname: {
						[Op.iLike]: `%${query}%`,
					},
					user_id: {
						[Op.not]: userId,
					},
				},
				attributes: ['user_id', 'nickname', 'status'],
				order: [[Sequelize.literal(`CASE WHEN "user"."status" = \'online\' THEN 1 WHEN "user"."status" = \'playing\' THEN 2 ELSE 3 END`)], ['user_id', 'ASC']],
				include: {
					model: userFriends,
					required: false,
					where: {
						user_id: userId,
					},
				},
				limit: perPage,
				offset,
			});

			let response = {};

			if (Math.round(listOfUser.count / perPage) > ++page) {
				response.nextPage = page;
			}

			response.rows = listOfUser.rows.map(({ user_id, nickname, status, user_friend }) => {
				let prepdata = { userId: user_id, nickname, status, btnsStatus: user_friend ? user_friend.status : null };

				if (user_friend) {
					prepdata.invitationId = user_friend.friend_id;
				}

				return prepdata;
			});
			response.query = query;
			/* 
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/getUsersByNicknameResponse" },
                description: "Search response" }
            */
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error" }
            */
			res.status(500).json({ message: e.message });
		}
	}

	async getProfileInfoByUserId(req, res) {
		try {
			const { targetUserId } = req.params;
			const { userId } = req.query;
			/*
            #swagger.auto = false
            #swagger.tags = ['User']
			#swagger.parameters['userId'] = {
				in: 'params',
				required: true,
				schema: '1',
			}
			#swagger.parameters['targetUserId'] = {
				in: 'params',
				required: true,
				schema: '1',
			}
 			*/

			const userResponse = await users.findOne({ where: { user_id: targetUserId } });

			if (!userResponse) {
				/*
                #swagger.responses[404] = { 
                    description: 'User not found',
                    schema: { "$ref": "#/definitions/Error" },
                }
                */
				return res.status(404).send({ message: 'User not found' });
			}

			const friendshipResponse = await userFriends.findOne({
				where: {
					user_id: userId,
					user_friend_id: targetUserId,
				},
			});

			const wins = await gameHistories.count({
				where: {
					winner_player_id: targetUserId,
				},
			});

			const losses = await gameHistories.count({
				where: {
					winner_player_id: {
						[Op.ne]: targetUserId,
					},
					[Op.or]: [{ first_player_id: targetUserId }, { second_player_id: targetUserId }],
				},
			});

			const draws = await gameHistories.count({
				where: {
					winner_player_id: 0,
					[Op.or]: [{ first_player_id: targetUserId }, { second_player_id: targetUserId }],
				},
			});

			const response = {
				userInfo: {
					nickname: userResponse.nickname,
					status: userResponse.status,
					rating: userResponse.rating,
				},
				stats: {
					wins: wins,
					draws: draws,
					losses: losses,
				},
				friendshipResponse: friendshipResponse ? { status: friendshipResponse.status, invitationId: friendshipResponse.friend_id } : { status: null },
			};

			/* 
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/GetProfileInfoByUserIdResponse" },
                description: "User profile info" }
            */
			return res.status(200).json(response);
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error" }
            */
			res.status(500).json({ message: e.message });
		}
	}

	async getGameHistoryByUserId(req, res) {
		try {
			const { userId } = req.params;
			let { page, perPage } = req.query;
			/*
            #swagger.auto = false
            #swagger.tags = ['User']

            #swagger.parameters['userId'] = {
                in: 'params',
                required: true,
               schema: '1'
            }

            #swagger.parameters['page'] = {
                in: 'query',
                required: true,
                schema: '1',
            }
           
            #swagger.parameters['perPage'] = {
                in: 'query',
                required: true,
                schema: '10',
            }

            */
			if (page < 0 || !page) {
				page = 0;
			}

			if (perPage <= 0 || !page) {
				perPage = 10;
			}

			const offset = page * perPage;

			const gameHistoryResponse = await gameHistories.findAndCountAll({
				where: {
					[Op.or]: [{ first_player_id: userId }, { second_player_id: userId }],
				},
				include: [
					{
						model: users,
						as: 'first_player',
						attributes: ['user_id', 'nickname'],
					},
					{
						model: users,
						as: 'second_player',
						attributes: ['user_id', 'nickname'],
					},
				],
				limit: perPage,
				offset,
				order: [['timestamp', 'DESC']],
			});

			let response = {};

			if (Math.round(gameHistoryResponse.count / perPage) > ++page) {
				response.nextPage = page;
			}

			response.rows = gameHistoryResponse.rows.map((item) => {
				let result = {};
				if (userId !== item.first_player.user_id) {
					result.userInfo = item.first_player;
				} else {
					result.userInfo = item.second_player;
				}

				if (item.winner_player_id == 0) {
					result.gameStatus = 'draw';
				} else if (userId === item.winner_player_id) {
					result.gameStatus = 'won';
				} else {
					result.gameStatus = 'lost';
				}
				result.winnerPlayerId = item.winner_player_id;
				result.gameHistoryId = item.game_history_id;
				result.timestamp = item.timestamp;
				return result;
			});

			/* 
            #swagger.responses[200] = { 
                schema: { "$ref": "#/definitions/GetGameHistoryByUserIdResponse" },
                description: "User game history" }
            */
			res.status(200).json(response);
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error" }
            */
			res.status(500).json({ message: e.message });
		}
	}

	async getUserRating(req, res) {
		try {
			const { userId } = req.params;
			/*
            #swagger.auto = false
            #swagger.tags = ['User']
            #swagger.parameters['userId'] = {
                in: 'params',
                required: true,
                schema: '1'
            }
            */
			const response = await users.findOne({
				where: {
					user_id: userId,
				},
				attributes: ['user_id', 'rating'],
			});

			if (!response) {
				/*
                #swagger.responses[404] = { 
                    description: 'Error!. Failed to get user rating' ,
                    schema: { "$ref": "#/definitions/Error" },
                }
                */
				return res.status(404).send({ message: 'Error!. Failed to get user rating' });
			}
			/* 
            #swagger.responses[200] = { 
                schema: 'number',
                description: "User game history" }
            */
			res.status(200).json(response.rating);
		} catch (e) {
			console.log(e);
			/* 
            #swagger.responses[500] = { 
                schema: { "$ref": "#/definitions/Error" },
                description: "Internal Server Error" }
            */
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new UserController();
