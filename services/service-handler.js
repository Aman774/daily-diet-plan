const { SuccessResponse, ErrorResponse } = require(`../utils`);

class ServiceHandler {
  handler(req, res, serviceOutput) {
    const {
      error,
      errorMsg = null,
      errorDesc = null,
      successMsg = "",
      line = null,
      file = null,
      result = [],
    } = serviceOutput;
    if (error) {
      if (line || file)
        __log_error(
          req,
          { error, errorMsg, errorDesc },
          line ? line : __line(),
          file ? file : __filename
        );
      return ErrorResponse(res, error, errorMsg, errorDesc);
    }
    return SuccessResponse(res, "success", result, successMsg);
  }
}
module.exports = ServiceHandler;
