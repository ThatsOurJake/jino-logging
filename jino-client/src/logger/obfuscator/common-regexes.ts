interface RegexItem {
  regex: RegExp;
  replace: string;
};

const regexes: RegexItem[] = [
  {
    regex: /\b(street|st|road|rd|avenue|ave|drive|dr|loop|court|ct|circle|cir|lane|ln|boulevard|blvd|way)\.?\b/gi,
    replace: 'STREET',
  },
  {
    regex: /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi,
    replace: 'EMAIL',
  },
  {
    regex: /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/gi,
    replace: 'POSTCODE',
  }
];

const obfuscateRegexes = (str: string) => {
  let obfuscated = str;

  regexes.forEach((regexItem) => {
    obfuscated = obfuscated.replace(regexItem.regex, regexItem.replace);
  });

  return obfuscated;
};

export default obfuscateRegexes;

