"use strict";
require("./configs/globals");
require("./scheduler");
const express = require("express");
const bodyParser = require("body-parser");

//importing all the routes
const { initRoutes } = require("./routes");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

//using bodyparser
app.use(bodyParser.json());
require("pg").types.setTypeParser(1114, (stringValue) => {
  return new Date(stringValue + "+05:30");
  // e.g., UTC offset. Use any offset that you would like.
});
initRoutes(app);

app.listen(3003, () => {
  console.log(`Example app listening on port 3003`);
});
