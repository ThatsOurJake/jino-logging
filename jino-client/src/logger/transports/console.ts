import type { Transport } from ".";
import type { LogPayload } from "..";

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

    const parsedTimestamp = new Date(payload.timestamp).toISOString();

    const message = `${parsedTimestamp} [${payload.level}] ${payload.key} ${payload.message}`;

    if (payload.custom) {
      message.concat(`\n=== Extra Info ===\n${JSON.stringify(payload.custom, null, 2)}`);
    };

    if (payload.stack) {
      message.concat(`\n=== Stack ===\n${payload.stack}`);
    }

    consoleFunc(message);
  }
};

export default consoleTransport;
