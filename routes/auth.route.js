const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app
    .route("/v1/client/signup")
    .post(authController.signup.bind(authController));

  app
    .route("/v1/client/activateAccount/:userId/:token")
    .get(authController.activateAccount.bind(authController));

  app.route("/v1/client/login").post(authController.login.bind(authController));
};
