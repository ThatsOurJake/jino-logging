import type { Transport } from ".";
import type { LogPayload } from "..";

const simpleTransport: Transport = {
  log: (payload: LogPayload) => {
    const { level } = payload;
    let consoleFunc = console.info;

    if (level === "warn") {
      consoleFunc = console.warn;
    }

    if (level === "error") {
      consoleFunc = console.error;
    }

    consoleFunc(payload.message);
  }
};

export default simpleTransport;
