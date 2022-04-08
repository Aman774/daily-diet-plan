const util = require("util");
// const URLs = require(`../configs/urls`);
// const { makeAxiosPostRequestSync } = require(`../utils`);

class TestService {
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

  async test() {
    __print(
      "********************************************* test service ***********************************************"
    );
    try {
      return {
        successMsg: "service is working fine",
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
module.exports = new TestService();
