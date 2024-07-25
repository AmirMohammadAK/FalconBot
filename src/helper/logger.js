import winston from "winston";

// Create a logger with specified settings
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level} : ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "./logs/info.log",
      level: "info",
      maxsize: 5242880,
      maxFiles: 4,
      format: winston.format.combine(
        winston.format((info) =>
          info.level === "error" || info.level === "warn" ? false : info
        )()
      ),
    }),

    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
      maxsize: 5242880,
      maxFiles: 4,
    }),

    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
      maxsize: 5242880,
      maxFiles: 4,
    }),
  ],
});

export default logger;
