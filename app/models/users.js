'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.users, {
        through: models.friends,
        as: 'user',
        foreignKey: 'friend_id',
      }),
      this.belongsToMany(models.users, {
        through: models.friends,
        as: 'friend_list',
        foreignKey: 'user_id',
      }),
      this.hasMany(models.chats, {
        foreignKey: 'from_user_id',
        as: 'outgoing_chats',
      }),
      this.hasMany(models.chats, {
        foreignKey: 'to_user_id',
        as: 'incoming_chats',
      }),
      this.hasMany(models.conversations, {
        foreignKey: 'user1'
      }),
      this.hasMany(models.conversations, {
        foreignKey: 'user2'
      })
    }
  }
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};