import _createLogger, { BaseLogPayload, LoggerOptions } from "../logger";

const createLogger = (opts: LoggerOptions, keyPrefix: string = 'client', baseLogPayload: BaseLogPayload = {}) => {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    throw new Error("client/createLogger is only available in the browser");
  }

  return _createLogger(opts, keyPrefix, {
    ...baseLogPayload,
    correlationId: () => window.crypto.randomUUID(),
    sessionId: () => window.sessionStorage.getItem("x-session-id"),
  });
};

export default createLogger;
