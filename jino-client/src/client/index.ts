import _createLogger, { LoggerOptions } from "../logger";

const createLogger = (opts: LoggerOptions) => {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    throw new Error("client/createLogger is only available in the browser");
  }

  return _createLogger(opts, 'client', {
    correlationId: () => window.crypto.randomUUID(),
    sessionId: () => window.sessionStorage.getItem("x-session-id"),
  });
};

export default createLogger;
