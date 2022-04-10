// const URLs = require(`../configs/urls`);
// const { makeAxiosPostRequestSync } = require(`../utils`);

const BasicHelper = require("../helpers/basic.helper");

const Diet = require("../data-source/diet.data");

const { emailService } = require("../other-services/nodemailer");

const jwt = require("jsonwebtoken");

class DietService {
  constructor() {
    this.errorResult = {
      error: "internal",
      errorMsg: "wrong",
      errorDesc: null,
      line: null,
      file: null,
      result: [],
    };
  }

  async getAllDietTypes(req, res) {
    __print(
      "********************************************* getAllDietTypes service ***********************************************"
    );
    try {
      const diet_types_list = await Diet.getAllDietTypes();

      return {
        successMsg: "success",
        result: diet_types_list,
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async saveDietSchedule(req, res) {
    __print(
      "********************************************* saveDietSchedule service ***********************************************"
    );

    __print("***req.body****", req.body);

    const {
      user_id,
      diet_type_id,
      item_name,
      diet_time,
      recommended,
      recommended_item_id,
    } = req.body;

    const insertData = {
      user_id: user_id,
      diet_type_id: diet_type_id,
      item_name: item_name,
      diet_time: diet_time,
      is_active: true,
      completed: false,
      recommended: recommended,
      recommended_item_id: recommended_item_id,
    };

    try {
      const schedule = await Diet.saveDietSchedule(insertData);

      return {
        successMsg: "success",
        result: {
          message: "diet schedule saved successfully ",
          schedule: schedule,
        },
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async DietSchedule(req, res) {
    __print(
      "********************************************* DietSchedule service ***********************************************"
    );

    __print("req.params******", req.params);
    __print("***userId****", req.params.userId);

    const { userId } = req.params;

    try {
      const schedule = await Diet.dietSchedule(userId);

      return {
        successMsg: "success",
        result: {
          message: "diet schedule fetched successfully ",
          schedule: schedule,
        },
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async updatedietSchedule(req, res) {
    __print(
      "********************************************* updatedietSchedule service ***********************************************"
    );

    __print("req.params******", req.params);
    __print("***scheduleId****", req.params.scheduleId);

    const { scheduleId } = req.params;

    try {
      const schedule = await Diet.updatedietSchedule(scheduleId);

      return {
        successMsg: "success",
        result: {
          message: "diet schedule updated successfully ",
          schedule: schedule,
        },
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }

  async recommendedDietItems(req, res) {
    __print(
      "********************************************* recommendedDietItems service ***********************************************"
    );

    __print("req.params******", req.params);
    __print("***dietTypeId****", req.params.dietTypeId);

    const { dietTypeId } = req.params;

    try {
      const recommendedItems = await Diet.recommendedDietItems(dietTypeId);

      return {
        successMsg: "success",
        result: {
          message: "recommended Items fetched successfully ",
          recommendedItems: recommendedItems,
        },
      };
    } catch (ex) {
      //   __print("in catch---------", ex.message);
      this.errorResult.errorDesc = ex.message;
      this.errorResult.line = __line();
      this.errorResult.file = __filename;
      return this.errorResult;
    }
  }
}
module.exports = new DietService();
