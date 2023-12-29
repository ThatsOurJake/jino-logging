import _createLogger, { LoggerOptions } from "../logger";

const createLogger = (opts: LoggerOptions) => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    throw new Error("server/createLogger is only available server side");
  }

  return _createLogger(opts, 'server');
};

export default createLogger;
