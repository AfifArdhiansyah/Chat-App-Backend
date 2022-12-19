'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: 'from_user_id',
        as: 'sender',
      }),
      this.belongsTo(models.users, {
        foreignKey: 'to_user_id',
        as: 'receiver',
      }),
      this.belongsTo(models.conversations, {
        foreignKey: 'conversation_id',
      })
    }
  }
  chats.init({
    from_user_id: DataTypes.UUID,
    to_user_id: DataTypes.UUID,
    text: DataTypes.STRING,
    conversation_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'chats',
  });
  return chats;
};