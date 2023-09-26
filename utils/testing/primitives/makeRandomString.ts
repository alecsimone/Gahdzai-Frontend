export const baseCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const specialCharacters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';

const makeRandomString = (
  length: number,
  includeSpecialChars: boolean = false
): string => {
  const characterSet = includeSpecialChars
    ? baseCharacters.concat(specialCharacters)
    : baseCharacters;

  let result = '';
  const characterSetLength = characterSet.length;

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * characterSetLength);
    result += characterSet.charAt(randomIndex);
  }

  return result;
};

export default makeRandomString;
