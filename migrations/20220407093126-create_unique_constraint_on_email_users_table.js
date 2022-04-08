"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `alter table users 
        ADD CONSTRAINT custom_unique_constraint_email UNIQUE (email);`
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
