"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("recommended_item_diet_type_mapping", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      recommended_item_id: {
        type: Sequelize.DataTypes.INTEGER,
        name: "master_recommended_items_fk",
        references: { model: "master_recommended_items", key: "id" },
      },

      diet_type_id: {
        type: Sequelize.DataTypes.INTEGER,
        name: "master_diet_type_fk",
        references: { model: "master_diet_type", key: "id" },
      },

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

    await queryInterface.dropTable("recommended_item_diet_type_mapping");
  },
};
