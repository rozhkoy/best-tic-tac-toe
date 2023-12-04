const sequelize = require('./databaseConection');
const { DataTypes } = require('sequelize');

const users = sequelize.define(
	'user',
	{
		user_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
		uid: { type: DataTypes.STRING, allowNull: false },
		nickname: { type: DataTypes.STRING, allowNull: false },
		rating: { type: DataTypes.INTEGER, allowNull: false },
		role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false },
		status: { type: DataTypes.ENUM('ONLINE', 'OFFLINE', 'PLAYING'), allowNull: false },
		isActive: { type: DataTypes.BOOLEAN, allowNull: false },
	},
	{ timestamps: false }
);

const gameHistories = sequelize.define(
	'game_history',
	{
		game_history_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
		first_player_id: { type: DataTypes.BIGINT, allowNull: false },
		second_player_id: { type: DataTypes.BIGINT, allowNull: false },
		winner_player_id: { type: DataTypes.BIGINT },
		timestamp: { type: DataTypes.BIGINT, allowNull: false },
	},
	{ timestamps: false }
);

const userFriends = sequelize.define(
	'user_friend',
	{
		friend_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
		user_id: { type: DataTypes.BIGINT, allowNull: false },
		user_friend_id: { type: DataTypes.BIGINT, allowNull: false },
		status: { type: DataTypes.STRING, allowNull: false },
		couple_id: { type: DataTypes.STRING },
	},
	{ timestamps: false }
);

users.hasOne(userFriends, { foreignKey: 'user_friend_id' });
userFriends.belongsTo(users, { foreignKey: 'user_id' });

gameHistories.belongsTo(users, { foreignKey: 'first_player_id', targetKey: 'user_id', as: 'first_player' });
gameHistories.belongsTo(users, { foreignKey: 'second_player_id', targetKey: 'user_id', as: 'second_player' });

module.exports = {
	users,
	userFriends,
	gameHistories,
};
