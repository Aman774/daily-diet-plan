const { STATUS_CODES } = require("http");
const httpCodes = {
  success: { code: 200, msg: "Ok" },
  allowed: { code: 201, msg: "Allowed" },
  moved: { code: 301, msg: "Moved Permanently" },
  found: { code: 302, msg: "Found" },
  badRequest: { code: 400, msg: "Bad Request" },
  unauthorized: { code: 401, msg: "Unauthorized" },
  payment: { code: 402, msg: "Payment Required" },
  notFound: { code: 404, msg: "Not Found" },
  notAllowed: { code: 405, msg: "Not Allowed" },
  unacceptable: { code: 406, msg: "Not Acceptable" },
  proxy: { code: 407, msg: "Proxy Authentication Required" },
  timeout: { code: 408, msg: "Request Timeout" },
  pre: { code: 412, msg: "Precondition Failed" },
  entity: { code: 413, msg: "Request Entity Too Large" },
  uri: { code: 414, msg: "Request - URI Too Long" },
  media: { code: 415, msg: "Unsupported Media Type" },
  upgrade: { code: 426, msg: "Upgrade Required" },
  location: { code: 452, msg: "Location Not Found" },
  internal: { code: 500, msg: "Internal Server Error" },
  gateway: { code: 502, msg: "Bad Gateway" },
  unavailable: { code: 503, msg: "Service Unavailable" },
};
for (let e in STATUS_CODES) httpCodes[e] = { code: e, msg: STATUS_CODES[e] };
exports.httpCodes = httpCodes;
