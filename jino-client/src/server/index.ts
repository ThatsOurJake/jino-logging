import _createLogger, { BaseLogPayload, LoggerOptions } from "../logger";

const createLogger = (opts: LoggerOptions, keyPrefix: string = 'server', baseLogPayload: BaseLogPayload = {}) => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    throw new Error("server/createLogger is only available server side");
  }

  return _createLogger(opts, keyPrefix, baseLogPayload);
};

export default createLogger;
