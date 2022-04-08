/**
 * Add altering commands here.
 *
 * Example:
 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
 */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      first_name: Sequelize.DataTypes.STRING,
      last_name: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      is_active: Sequelize.DataTypes.BOOLEAN,
      createdAt: {
        field: "created_at",
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("users");
  },
};
