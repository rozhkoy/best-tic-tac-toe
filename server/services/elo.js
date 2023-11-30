module.exports = function (rating, opponentRating, gameResult, factor) {
	const K = 30 * factor;
	let chanceToWin = 1 / (1 + Math.pow(10, (opponentRating - rating) / 400));
	return rating + Math.round(K * (gameResult - chanceToWin));
};
