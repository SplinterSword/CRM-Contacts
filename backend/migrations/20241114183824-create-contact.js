'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Phone_Number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Job_Title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'Username',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add a composite unique constraint
    await queryInterface.addConstraint('Contacts', {
      fields: ['Username', 'Email', 'Phone_Number'],
      type: 'unique',
      name: 'unique_user_email_phone_constraint',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraint first
    await queryInterface.removeConstraint('Contacts', 'unique_user_email_phone_constraint');
    await queryInterface.dropTable('Contacts');
  },
};
