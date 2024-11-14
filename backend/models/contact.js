'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // Define the association with User
      Contact.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
    }
  }

  Contact.init(
    {
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Phone_Number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      Company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Job_Title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'Contacts',
    }
  );

  return Contact;
};
