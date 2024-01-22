import NAMES from "./names";

const obfuscateNames = (str: string) => {
  const words = str.split(' ');
  
  const obfuscated = words.map((word) => {
    const name = NAMES.find((name) => name === word.toLowerCase());
    
    if (name) {
      return 'NAME';
    }
    
    return word;
  });

  return obfuscated.join(' ');
};

export default obfuscateNames;
