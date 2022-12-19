'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.chats, {
        foreignKey: 'conversation_id',
      })
    }
  }
  conversations.init({
    user1: DataTypes.UUID,
    user2: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'conversations',
  });
  return conversations;
};