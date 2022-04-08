"use strict";
require("./configs/globals");
const express = require("express");
const bodyParser = require("body-parser");

//importing all the routes
const { initRoutes } = require("./routes");

const app = express();

//using bodyparser
app.use(bodyParser.json());
initRoutes(app);

app.listen(3003, () => {
  console.log(`Example app listening on port 3003`);
});
