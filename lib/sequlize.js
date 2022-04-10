const glob = require("glob");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    // dialectOptions: {
    //   useUTC: false, //for reading from database
    // },
    // timezone: "+05:30", //for writing to database
    port: POSTGRES_PORT,
    replication: {
      read: [{ host: POSTGRES_SLAVE }],
      write: { host: POSTGRES_MASTER },
    },
    define: {
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000,
    },
  }
);
const db = {};
const models = glob.sync(__root_path(`/models/*.model.js`));

models.forEach((model_file) => {
  if (DEBUG === true) __print("Model:", model_file);
  const model = require(model_file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
