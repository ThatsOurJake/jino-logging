import type { LogMessageDIO } from "../index";
import obfuscateRegexes from "./common-regexes";
import obfuscateNames from "./name-obfuscator";

const obfuscate = (payload: LogMessageDIO) => {
  const copy = { ...payload };

  copy.message = obfuscateNames(obfuscateRegexes(copy.message));

  if (copy.custom) {
    Object.keys(copy.custom).forEach((key) => {
      copy.custom![key] = obfuscateNames(obfuscateRegexes(copy.custom![key] as string));
    });
  }

  return copy;
};

export default {
  obfuscate,
};
