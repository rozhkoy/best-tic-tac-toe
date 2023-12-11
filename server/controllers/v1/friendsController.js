const { users, userFriends } = require('../../database/models');
const { Op } = require('sequelize');
const { Sequelize } = require('../../database/databaseConection');
const friendsBtnStatuses = require('../../constants/friendBtnStatuses');

class FriendController {
	async sendInviteToFriendship(req, res) {
		try {
			const { userId } = req.params;
			const { invitationUserId } = req.body;
			/*
			#swagger.auto = false
			#swagger.tags = ['Friends']
			#swagger.parameters['userId'] = {
				in: 'params',
				required: true,
				schema: '1'
			}
			#swagger.parameters['invitationUserId'] = {
				in: 'formData',
				required: true,
				schema: '1'
			}
 			*/

			if (!invitationUserId || !userId) {
				/*
                #swagger.responses[400] = { 
                    schema: { "$ref": "#/definitions/Error" },
                    description: 'Error!. Missing required query parameters',
                }
                */
				return res.status(400).json({ message: 'Error!. Missing required query parameters' });
			}

			// need to fix this method
			const firstFriendshipRecordResponse = await userFriends.create({
				user_id: userId,
				user_friend_id: invitationUserId,
				status: friendsBtnStatuses.PENDING,
				coupleId: null,
			});

			if (!firstFriendshipRecordResponse) {
				throw new Error('Error!. Failed to create friendship record');
			}

			const secondFriendshipRecordResponse = await userFriends.create({
				user_id: invitationUserId,
				user_friend_id: userId,
				status: friendsBtnStatuses.INVITATION_TO_FRIENDS,
				couple_id: firstFriendshipRecordResponse.friend_id,
			});

			if (!secondFriendshipRecordResponse) {
				throw new Error('Error!. Failed to create friendship record');
			}

			const updateFriendshipRecordResponse = await userFriends.update(
				{
					couple_id: secondFriendshipRecordResponse.friend_id,
				},
				{
					where: { friend_id: firstFriendshipRecordResponse.friend_id },
				}
			);

			if (!updateFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update friendship record');
			}
			/* 
            #swagger.responses[200] = { 
                schema: '11',
                description: "Invitation id" }
            */
			return res.status(200).json(firstFriendshipRecordResponse.friend_id);
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

	async acceptFriendshipInvite(req, res) {
		try {
			const { invitationId } = req.params;
			/*
			#swagger.auto = false
			#swagger.tags = ['Friends']
			#swagger.parameters['invitationId'] = {
				in: 'params',
				required: true,
				schema: '1'
			}
 			*/
			if (!invitationId) {
				/*
                #swagger.responses[400] = { 
                    schema: { "$ref": "#/definitions/Error" },
                    description: 'Error!. Missing required query parameters',
                }
                */
				return res.status(400).json({ message: 'Error!. Missing required query parameters' });
			}

			const status = await userFriends.update(
				{ status: friendsBtnStatuses.FRIEND },
				{
					where: {
						friend_id: invitationId,
					},
				}
			);

			if (!status) {
				throw new Error('Error!. Failed to update friendship record');
			}

			const secondFriendshipRecordResponse = await userFriends.findOne({
				where: {
					friend_id: invitationId,
				},
			});

			if (!secondFriendshipRecordResponse) {
				throw new Error('Error!. Failed to get friendship record');
			}

			const updateFriendshipRecordResponse = await userFriends.update(
				{ status: secondFriendshipRecordResponse.status, user_id: secondFriendshipRecordResponse.user_friend_id, user_friend_id: secondFriendshipRecordResponse.user_id },
				{ where: { friend_id: secondFriendshipRecordResponse.couple_id } }
			);

			if (!updateFriendshipRecordResponse) {
				throw new Error('Error!. Failed to update friendship record');
			}
			/* 
            #swagger.responses[200] = { 
                schema: true,
                description: "Update status" }
            */
			res.status(200).json(!!updateFriendshipRecordResponse);
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

	async rejectFriendshipInvite(req, res) {
		try {
			const { invitationId } = req.params;
			/*
			#swagger.auto = false
			#swagger.tags = ['Friends']
			#swagger.parameters['invitationId'] = {
				in: 'params',
				required: true,
				schema: '1'
			}
			
 			*/

			const firstFriendshipRecordResponse = await userFriends.findOne({
				where: {
					friend_id: invitationId,
				},
			});

			if (!firstFriendshipRecordResponse) {
				/*
                #swagger.responses[404] = { 
                    description: 'Error!. Failed to get friendship record' ,
                    schema: { "$ref": "#/definitions/Error" },
                }
                */
				return res.status(404).send({ message: 'Error!. Failed to get friendship record' });
			}

			const firstFriendshipRecordDeletion = await userFriends.destroy({
				where: {
					friend_id: invitationId,
				},
			});

			if (!firstFriendshipRecordDeletion) {
				throw new Error('Error!. Failed to destory friendship record');
			}

			const secondFriendshipRecordDeletion = await userFriends.destroy({
				where: {
					friend_id: firstFriendshipRecordResponse.couple_id,
				},
			});

			if (!secondFriendshipRecordDeletion) {
				throw new Error('Error!. Failed to destory friendship record');
			}
			/* 
            #swagger.responses[200] = { 
                schema: true,
                description: "Destruction status" }
            */
			res.status(200).json(firstFriendshipRecordDeletion && secondFriendshipRecordDeletion);
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

	async getAllFriends(req, res) {
		try {
			const { userId } = req.params;
			let { page, perPage, query = '' } = req.query;
			/*
			#swagger.auto = false
			#swagger.tags = ['Friends']
			#swagger.parameters['userId'] = {
				in: 'params',
				required: true,
				  schema: '1',
			}s
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

			const listOfFriends = await users.findAndCountAll({
				attributes: ['user_id', 'nickname', 'status'],
				where: {
					nickname: {
						[Op.iLike]: `%${query}%`,
					},
				},
				order: [[Sequelize.literal('CASE WHEN "user"."status" = \'ONLINE\' THEN 1 WHEN "user"."status" = \'PLAYING\' THEN 2 ELSE 3 END')], ['user_id', 'ASC']],
				include: {
					model: userFriends,
					where: {
						user_id: userId,
						status: {
							[Op.or]: [friendsBtnStatuses.FRIEND, friendsBtnStatuses.INVITED_TO_GAME],
						},
					},
				},
				limit: perPage,
				offset,
			});

			let response = {};

			if (Math.round(listOfFriends.count / perPage) > ++page) {
				response.nextPage = page;
			}

			response.rows = listOfFriends.rows.map(({ user_id, nickname, status, user_friend }) => {
				return { userId: user_id, nickname, status, btnsStatus: user_friend ? user_friend.status : null };
			});
			/* 
            #swagger.responses[200] = { 
				schema: { "$ref": "#/definitions/getUsersByNicknameResponse" }
			}
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

	async getAllRequestsForFriendship(req, res) {
		try {
			const { userId } = req.params;
			let { page, perPage, query = '' } = req.query;
			/*
			#swagger.auto = false
			#swagger.tags = ['Friends']
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

			const listOfRequests = await users.findAndCountAll({
				where: {
					nickname: {
						[Op.iLike]: `%${query}%`,
					},
				},
				include: {
					model: userFriends,
					where: {
						user_id: userId,
						status: {
							[Op.eq]: friendsBtnStatuses.INVITATION_TO_FRIENDS,
						},
					},
				},
				attributes: ['user_id', 'nickname', 'status'],
				limit: perPage,
				offset,
			});

			let response = {};

			if (Math.round(listOfRequests.count / perPage) > ++page) {
				response.nextPage = page;
			}

			response.rows = listOfRequests.rows.map(({ user_id, nickname, status, user_friend }) => {
				return { userId: user_id, nickname, status, btnsStatus: user_friend ? user_friend.status : null, invitationId: user_friend.friend_id };
			});
			/* 
            #swagger.responses[200] = { 
				schema: { "$ref": "#/definitions/getUsersByNicknameResponse" }
			}
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
}

module.exports = new FriendController();
