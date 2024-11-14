'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Contact, { foreignKey: 'UserId', as: 'contacts' });
    }
  }

  User.init(
    {
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('Password', hash);
        }
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  return User;
};
