function isHSL(baseColor: string) {
  // Checks if a string is an HSL or HSLA formatted color
  const hslCheck = baseColor.substring(0, 3);
  if (hslCheck.toLowerCase() === 'hsl') {
    return true;
  }
  return false;
}

function countCommas(string: string) {
  return (string.match(/,/g) || []).length;
}

function getNthPositionOfSubstring(
  string: string,
  subString: string,
  n: number
) {
  return string.split(subString, n).join(subString).length;
}

function replaceNthValue(
  string: string,
  replacementValue: string | number,
  n: number
) {
  const commaCount = countCommas(string);
  if (commaCount === 2 && n === 4) {
    // If the provided string is HSL format (and thus only has two commas), but the request is to modify its fourth value (the color's alpha, which would be an HSLA color), we just pop the replacementValue on the end
    const firstParenIndex = string.indexOf('(');
    const startingString = string.substring(firstParenIndex, string.length - 1);
    return `hsla${startingString}, ${replacementValue})`;
  }

  // We get the comma that precedes the value we want to replace, and then the text that comes after it
  const startingComma = getNthPositionOfSubstring(string, ',', n - 1);
  const startingString = string.substring(0, startingComma + 1);

  if (commaCount < n) {
    // If there are fewer commas than the count of the value to change, we're changing the last value, so we can just end the string with our new value, a closing parentheses, and a % before the paren if we're not modifying the alpha value (i.e. if n !== 4).
    const endingString = n === 4 ? ')' : '%)';
    return `${startingString} ${replacementValue}${endingString}`;
  }

  // Otherwise, we find the comma after the requested value and make a new string starting from that comma. Then we change pop the new value in between the starting and ending strings
  const endingComma = getNthPositionOfSubstring(string, ',', n);
  const endingString = string.substring(endingComma);

  return `${startingString} ${replacementValue}%${endingString}`;
}

type ModifyColorFunction = (baseColor: string, level: number) => string;

const setSaturation: ModifyColorFunction = (baseColor, level) => {
  if (isHSL(baseColor)) {
    return replaceNthValue(baseColor, level, 2);
  }
  return baseColor;
};
export { setSaturation };

const setLightness: ModifyColorFunction = (baseColor, level) => {
  if (isHSL(baseColor)) {
    return replaceNthValue(baseColor, level, 3);
  }
  return baseColor;
};
export { setLightness };

const setAlpha: ModifyColorFunction = (baseColor, level) => {
  if (isHSL(baseColor)) {
    return replaceNthValue(baseColor, level, 4);
  }
  return baseColor;
};
export { setAlpha };
