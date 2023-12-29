import { Transport } from ".";
import { LogPayload } from "..";

const consoleTransport: Transport = {
  log: (payload: LogPayload) => {
    const { level } = payload;
    let consoleFunc = console.info;

    if (level === "warn") {
      consoleFunc = console.warn;
    }

    if (level === "error") {
      consoleFunc = console.error;
    }

    consoleFunc(payload);
  }
};

export default consoleTransport;
