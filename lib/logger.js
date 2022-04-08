const { createLogger, format, transports } = require("winston");
const { combine, printf, colorize } = format;

const myFormat = printf(({ level, message }) => {
  return `${level} | "${SERVICE_NAME}" | ${new Date().toLocaleString()}: ${message}`;
});

class Logger {
  #logger;
  constructor() {
    this.#logger = createLogger({
      format: combine(colorize(), myFormat),
      transports: [
        new transports.Console({
          // level: process.env.NODE_ENV === "development" ? "debug" : "info",
          handleExceptions: true,
          stderrLevels: ["error"],
        }),
      ],
    });
    this.logger = createLogger({
      format: combine(colorize()),
      transports: [
        new transports.Console({
          // level: process.env.NODE_ENV === "development" ? "debug" : "info",
          handleExceptions: true,
          stderrLevels: ["error"],
        }),
      ],
    });
  }
  joinLog(_) {
    for (let each = 0; each < _.length; each++) {
      if (typeof _[each] == "object") _[each] = JSON.stringify(_[each]);
    }
    return _;
  }
  decodeToken(token) {
    if (token && token.authorization)
      return JSON.parse(atob(token.authorization.split(".")[1]));
    else return { userId: "", username: "" };
  }
  extractField(req, fields = []) {
    const obj = {};
    fields.map((e) => {
      switch (e) {
        case "userId":
          obj.userId = this.decodeToken(req.header).userId;
          break;
        case "username":
          obj.username = this.decodeToken(req.header).username;
          break;
        case "originalUrl":
          obj.originalUrl = req.originalUrl;
          break;
        case "remoteAddress":
          obj.remoteAddress = req.connection.remoteAddress;
          break;
        case "deviceInfo":
          obj.deviceInfo = req.headers["user-agent"];
          break;
        case "reqParam":
          obj.reqParam = {
            query: req.query,
            body: req.body,
            param: req.params,
          };
          break;
        case "reqMethod":
          obj.reqMethod = req.method;
          break;
      }
    });
    return obj;
  }
  format(req, other, dLine = null, dFile = null) {
    let { line = dLine, file = dFile } = other;
    delete other.line;
    delete other.file;
    let requiredFields = [
      "userId",
      "username",
      "originalUrl",
      "remoteAddress",
      "deviceInfo",
      "reqParam",
      "reqMethod",
    ];
    const {
      userId,
      username,
      originalUrl,
      remoteAddress,
      deviceInfo,
      reqParam,
      reqMethod,
    } = this.extractField(req, requiredFields);
    let logOption = {
      serviceName: SERVICE_NAME,
      dateTime: new Date().toLocaleString(),
      username,
      userId,
      originalUrl,
      remoteAddress,
      deviceInfo,
      reqParam,
      reqMethod,
      line,
      file,
      logs: other,
    };
    __print(logOption);
    return logOption;
  }
  writeInfo(req, logs, line, file) {
    this.logger.info(this.format(req, logs, line, file));
  }
  writeError(req, logs, line, file) {
    __print(logs, line, file);
    this.logger.error(this.format(req, logs, line, file));
  }
  writeDebug(req, logs, line, file) {
    this.logger.debug(this.format(req, logs, line, file));
  }
  info(...msg) {
    this.#logger.info(this.joinLog(msg).join(" "));
  }
  error(...msg) {
    this.#logger.error(this.joinLog(msg).join(" "));
  }
  debug(...msg) {
    this.#logger.debug(this.joinLog(msg).join(" "));
  }
}

module.exports = new Logger();
