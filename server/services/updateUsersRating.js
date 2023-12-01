module.exports = async function updateUsersRating({ firstPlayerId, secondPlayerId, winnerPlayerId, sessionId, factor, sessions }) {
	const createGameHistoryRecordResponse = await gameHistory.create({
		firstPlayerId,
		secondPlayerId,
		winnerPlayerId,
		timestamp: Date.now(),
	});

	if (!createGameHistoryRecordResponse) {
		throw new Error('Error!. Faild to create game history record');
	}

	const firstPlayerInfo = await user.findOne({
		where: {
			user_id: firstPlayerId,
		},
		attributes: ['rating', 'user_id'],
	});

	const secondPlayerInfo = await user.findOne({
		where: {
			user_id: secondPlayerId,
		},
		attributes: ['rating', 'user_id'],
	});

	const newFirstPlayerRating = elo(firstPlayerInfo.rating, secondPlayerInfo.rating, winnerPlayerId == 0 ? 0.5 : winnerPlayerId == firstPlayerId ? 1 : 0, factor);

	const newSecondPlayerRating = elo(secondPlayerInfo.rating, firstPlayerInfo.rating, winnerPlayerId == 0 ? 0.5 : winnerPlayerId == secondPlayerId ? 1 : 0, factor);

	const updateFirstPlayerRatingResponse = await user.update(
		{
			rating: newFirstPlayerRating,
		},
		{
			where: {
				user_id: firstPlayerId,
			},
		}
	);

	if (!updateFirstPlayerRatingResponse) {
		throw new Error('Error!. Faild to update user rating');
	}

	const updateSecondPlayerRatingResponse = await user.update(
		{
			rating: newSecondPlayerRating,
		},
		{
			where: {
				user_id: secondPlayerId,
			},
		}
	);

	if (!updateSecondPlayerRatingResponse) {
		throw new Error('Error!. Faild to update user rating');
	}

	sessions.delete(sessionId);

	return {};
};
