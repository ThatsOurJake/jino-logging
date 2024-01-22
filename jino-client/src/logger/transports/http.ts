import type { Transport } from ".";
import type { LogPayload } from "..";

const LOGGER_ENDPOINT = process.env.LOGGER_ENDPOINT || "http://localhost:3000";

// TODO api key
// TODO retry
// TODO queue and filter duplicates
// TODO use beacon api

const httpTransport: Transport = {
  log: (payload: LogPayload) => {
    fetch(`${LOGGER_ENDPOINT}/log`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {});
  }
};

export default httpTransport;
