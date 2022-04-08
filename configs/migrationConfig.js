const {
  dbConfig: {
    postgres: { migration: configuration },
  },
} = require("./config");
module.exports = configuration;
