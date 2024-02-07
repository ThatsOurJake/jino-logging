import obfuscator from "./obfuscator";
import transportMap, { type LoggerTransport } from "./transports";

const LOGGER_LEVEL = process.env.LOGGER_LEVEL || "info";

export type LoggingLevels = "info" | "warn" | "error" | "debug";

export interface LoggerOptions {
  appName: string;
  transports: LoggerTransport[];
}

const loggingLevelTable: { [level in LoggingLevels]: LoggingLevels[] } = {
  debug: ["debug", "info", "warn", "error"],
  info: ["info", "warn", "error"],
  warn: ["warn", "error"],
  error: ["error"],
};

const getCurrentLevel = () => {
  return LOGGER_LEVEL as LoggingLevels;
};

const canLog = (level: LoggingLevels) => {
  return loggingLevelTable[getCurrentLevel()].includes(level);
};

type Nullable<T> = T | null | undefined;

type valueFunc = (() => Nullable<string>) | string;

export interface LogMessage {
  key: string;
  message: string;
  stack?: string;
  correlationId?: valueFunc;
  sessionId?: valueFunc;
  custom?: { [key: string]: string | number | boolean };
}

export interface BaseLogPayload extends Partial<LogMessage> {};

export interface LogPayload extends LogMessage {
  appName: string;
  level: LoggingLevels;
  timestamp: number;
}

const transformBaseLogPayload = (baseLogPayload: BaseLogPayload) => {
  return Object.keys(baseLogPayload).reduce((acc, key) => {
    const value = baseLogPayload[key];

    if (typeof value === "function") {
      return {
        ...acc,
        [key]: value(),
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

const createLogger = (opts: LoggerOptions, keyPrefix: string, baseLogPayload: BaseLogPayload = {}) => {
  const { appName, transports = ['console'] } = opts;

  if (!appName) {
    throw new Error("appName is required");
  }

  if (transports.includes('console') && transports.includes('simple')) {
    throw new Error("transports cannot include both console and simple");
  }

  const log = (logLevel: LoggingLevels, msg: LogMessage) => {
    const payload: LogPayload = {
      ...transformBaseLogPayload(baseLogPayload),
      ...msg,
      key: `${keyPrefix}.${msg.key}`,
      appName,
      level: logLevel,
      timestamp: Date.now().valueOf(),
    };

    const funcs = transports.map((transport) => transportMap[transport].log);

    const obfuscatedPayload = obfuscator.obfuscate(payload);

    funcs.forEach((func) => {
      if (canLog(logLevel)) {
        func(obfuscatedPayload);
      }
    });
  };

  const debug = (msg: LogMessage) => {
    log("debug", msg);
  };

  const info = (msg: LogMessage) => {
    log("info", msg);
  };

  const warn = (msg: LogMessage) => {
    log("warn", msg);
  };

  const error = (msg: LogMessage) => {
    log("error", msg);
  };

  return {
    debug,
    info,
    warn,
    error,
  }
};

export default createLogger;
