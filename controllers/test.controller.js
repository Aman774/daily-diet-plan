const { ErrorResponse } = require(`../utils`);
const ServiceHandler = require("../services/service-handler");
const TestService = require("../services/test.service");

class TestController extends ServiceHandler {
  constructor() {
    super();
  }
  async test(req, res) {
    __print(
      "********************************************* test controller ***********************************************"
    );
    try {
      this.handler(req, res, await TestService.test());
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }
}
module.exports = new TestController();
