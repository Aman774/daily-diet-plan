"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("user_diet_schedules", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        name: "users_fk",
        references: { model: "users", key: "id" },
      },
      item_name: Sequelize.DataTypes.STRING,
      diet_type_id: {
        type: Sequelize.DataTypes.INTEGER,
        name: "master_diet_type_fk",
        references: { model: "master_diet_type", key: "id" },
      },
      diet_time: Sequelize.DataTypes.DATE,
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

    await queryInterface.dropTable("user_diet_schedules");
  },
};
