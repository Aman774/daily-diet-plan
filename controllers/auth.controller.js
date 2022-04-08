const { ErrorResponse } = require(`../utils`);
const ServiceHandler = require("../services/service-handler");
const AuthService = require("../services/auth.service");

class TestController extends ServiceHandler {
  constructor() {
    super();
  }
  async signup(req, res) {
    __print(
      "********************************************* signup controller ***********************************************"
    );
    try {
      this.handler(req, res, await AuthService.signup(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }

  async activateAccount(req, res) {
    __print(
      "********************************************* activateAccount controller ***********************************************"
    );
    try {
      this.handler(req, res, await AuthService.activateAccount(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }

  async login(req, res) {
    __print(
      "********************************************* login controller ***********************************************"
    );
    try {
      this.handler(req, res, await AuthService.login(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }
}
module.exports = new TestController();
