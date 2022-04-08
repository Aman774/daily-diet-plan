module.exports = {
  secretKey: "rapimoney__@#$321",
  dbConfig: {
    postgres: {
      migration: {
        host: POSTGRES_SLAVE,
        username: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT,
        database: POSTGRES_DATABASE,
        dialect: "postgres",
      },
    },
  },
};
