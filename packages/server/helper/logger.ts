const { NODE_ENV } = process.env;
import winston = require("winston");

let level;
let transports;

switch (NODE_ENV) {
  case "development":
    level = "verbose";
    transports = [new winston.transports.Console()];
    break;
  case "production":
    level = "verbose";
    // transports = [
    //   new winston.transports.File({
    //     filename: 'error.log',
    //     level: 'error',
    //   }),
    //   new winston.transports.File({
    //     filename: 'combined.log',
    //     level: 'verbose',
    //   }),
    // ]
    transports = [new winston.transports.Console()];
    break;
}

export default winston.createLogger({
  level,
  transports
});
