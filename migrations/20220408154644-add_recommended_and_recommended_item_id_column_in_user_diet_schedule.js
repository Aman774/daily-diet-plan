"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("user_diet_schedules", "recommended", {
      type: Sequelize.DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn(
      "user_diet_schedules",
      "recommended_item_id",
      {
        type: Sequelize.DataTypes.INTEGER,
        name: "master_recommended_items_fk",
        references: { model: "master_recommended_items", key: "id" },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     *
     *
     */

    await queryInterface.removeColumn("user_diet_schedules", "recommended");
    await queryInterface.removeColumn(
      "user_diet_schedules",
      "recommended_item_id"
    );
  },
};
