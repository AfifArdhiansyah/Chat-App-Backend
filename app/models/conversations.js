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
      }),
      this.belongsTo(models.users, {
        foreignKey: 'user1',
        as: 'user1_conversation',
      }),
      this.belongsTo(models.users, {
        foreignKey: 'user2',
        as: 'user2_conversation',
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