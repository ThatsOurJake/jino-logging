import type { LogPayload } from "..";

import consoleTransport from "./console";
import httpTransport from "./http";

export type LoggerTransport = "console" | "http";

export interface Transport {
  log: (payload: LogPayload) => void;
};

const transportMap: { [key in LoggerTransport]: Transport } = {
  console: consoleTransport,
  http: httpTransport,
};

export default transportMap;
