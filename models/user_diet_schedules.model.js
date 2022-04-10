const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("user_diet_schedules", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: type.UUID,
      name: "users_fk",
      references: { model: "users", key: "id" },
    },
    item_name: type.STRING,
    diet_type_id: {
      type: type.INTEGER,
      name: "master_diet_type_fk",
      references: { model: "master_diet_type", key: "id" },
    },
    diet_time: type.DATE,
    is_active: type.BOOLEAN,
    completed: type.BOOLEAN,
    recommended: type.BOOLEAN,
    recommended_item_id: type.INTEGER,
    createdAt: {
      field: "created_at",
      type: type.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      field: "updated_at",
      type: type.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
};
