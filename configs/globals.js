"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const path = require("path");

const root = path.resolve("./");

const logger = require("../lib/logger");

// define all your global constants
const GLOBAL_CONSTANTS = {
  PID: process.pid,
  PORT: process.env.PORT || 3003,
  SERVICE_NAME: process.env.SERVICE_NAME || "UNKNOWN",
  POSTGRES_MASTER: process.env.POSTGRES_MASTER,
  POSTGRES_SLAVE: process.env.POSTGRES_SLAVE,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  SECRET: process.env.SECRET,
  __root_path: (filePath) => `${root}${filePath}`,
  DEBUG: Boolean(process.env.DEBUG) || false,
  __exit_app: process.exit,
  __root_path: (filePath) => `${root}${filePath}`,
  __print: (...log) => (process.env.DEBUG ? logger.info(...log) : ""),
  __print_error: (...log) => logger.error(...log),
  __debug: (...log) => (process.env.DEBUG ? logger.info(...log) : ""),
  __log_info: (req, logs, line, file) =>
    process.env.DEBUG ? logger.writeInfo(req, logs, line, file) : "",
  __log_error: (req, logs, line, file) =>
    logger.writeError(req, logs, line, file),
  __log_debug: (req, logs, line, file) =>
    process.env.DEBUG ? logger.writeDebug(req, logs, line, file) : "",
  // __warn: (...log) => process.env.DEBUG ? logger.warn(...log) : '',
  // __verbose: (...log) => logger.verbose(...log),
  // __sily: (...log) => logger.sity(...log),
  __line: (_) => {
    const e = new Error();
    const frame = e.stack.split("\n")[2];
    const lineNumber = frame.split(":")[1];
    // print(__LINE.caller)
    // print('lineNumber', lineNumber)
    // return `\nLine No.: ${lineNumber}\nFile: ${__filename}\n`;
    if (_) return lineNumber;
    return `\nLine No.: ${lineNumber}`;
  },
};
for (let key in GLOBAL_CONSTANTS) {
  delete global[key];
  global[key] = GLOBAL_CONSTANTS[key];
}
for (let key in GLOBAL_CONSTANTS)
  DEBUG && typeof GLOBAL_CONSTANTS[key] != "function"
    ? __print(`${key}: ${GLOBAL_CONSTANTS[key]}`)
    : null;

process.on("uncaughtException", (err) =>
  console.log("\nNode uncaughtException:: ", err)
);
process.on("SIGTERM", (err) => {
  __print("\nNode SIGTERM:: ", err);
  process.kill(PID);
});
// process.on('SIGINT', (err) => __print("\nNode SIGINT:: ", err);)
process.on("exit", (err) => __print("\nNode exit:: ", err));
process.on("unhandledRejection", (err) =>
  console.log("\nNode unhandledRejection:: ", err)
);
