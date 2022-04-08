const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("users", {
    id: {
      type: type.UUID,
      primaryKey: true,
      defaultValue: type.UUIDV4,
    },

    first_name: type.STRING,
    last_name: type.STRING,
    email: type.STRING,
    password: type.STRING,
    is_active: type.BOOLEAN,
    createdAt: {
      field: "created_at",
      type: type.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: type.DATE,
    },
  });
};
