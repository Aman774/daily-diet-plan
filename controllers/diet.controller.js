const { ErrorResponse } = require(`../utils`);
const ServiceHandler = require("../services/service-handler");
const DietService = require("../services/diet.service");

class TestController extends ServiceHandler {
  constructor() {
    super();
  }
  async getAllDietTypes(req, res) {
    __print(
      "********************************************* getAllDietTypes controller ***********************************************"
    );
    try {
      this.handler(req, res, await DietService.getAllDietTypes(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }
  async saveDietSchedule(req, res) {
    __print(
      "********************************************* saveDietSchedule controller ***********************************************"
    );
    try {
      this.handler(req, res, await DietService.saveDietSchedule(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }

  async DietSchedule(req, res) {
    __print(
      "********************************************* DietSchedule controller ***********************************************"
    );
    try {
      this.handler(req, res, await DietService.DietSchedule(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }

  async updatedietSchedule(req, res) {
    __print(
      "********************************************* updatedietSchedule controller ***********************************************"
    );
    try {
      this.handler(req, res, await DietService.updatedietSchedule(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }

  async recommendedDietItems(req, res) {
    __print(
      "********************************************* recommendedDietItems controller ***********************************************"
    );
    try {
      this.handler(req, res, await DietService.recommendedDietItems(req, res));
    } catch (ex) {
      __log_error(req, new Error(ex), __line(), __filename);
      return ErrorResponse(res, "internal", "wrong", ex.message);
    }
  }
}
module.exports = new TestController();
