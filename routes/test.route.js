const testController = require("../controllers/test.controller");

module.exports = (app) => {
  app.route("/v1/client/test").get(testController.test.bind(testController));
};
