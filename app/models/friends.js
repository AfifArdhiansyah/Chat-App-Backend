'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   this.belongsTo(models.users, {
    //     foreignKey: 'user_id',
    //   })
    // }
  }
  friends.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    friend_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};