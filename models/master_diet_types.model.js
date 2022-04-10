const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("master_diet_type", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    diet_type: type.STRING,

    is_active: type.BOOLEAN,
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
