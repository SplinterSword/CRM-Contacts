'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Contact, {
        foreignKey: 'Username',
        sourceKey: 'Username',
        as: 'contacts',
      });
    }
  }

  User.init(
    {
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    }
  );

  return User;
};
