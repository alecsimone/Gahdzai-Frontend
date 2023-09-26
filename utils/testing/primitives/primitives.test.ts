// import '@testing-library/jest-dom';

import makeRandomNumber from './makeRandomNumber';
import makeRandomString, { specialCharacters } from './makeRandomString';

describe('makeRandomString', () => {
  it('Generates a string of the right length', () => {
    const length = 12;
    const randomString = makeRandomString(length);
    expect(randomString).toHaveLength(length);
  });

  it('Only has special characters when requested', () => {
    const randomString = makeRandomString(100);
    const specialCharactersArray = Array.from(specialCharacters);
    specialCharactersArray.forEach((letter) => {
      const stringIncludesLetter = randomString.includes(letter);
      expect(stringIncludesLetter).toBe(false);
    });

    const randomStringWithSpecialCharacters = makeRandomString(100, true);
    let stringIncludesSpecialCharacters = false;
    specialCharactersArray.forEach((letter) => {
      if (randomStringWithSpecialCharacters.includes(letter)) {
        stringIncludesSpecialCharacters = true;
      }
    });

    expect(stringIncludesSpecialCharacters).toBe(true);
  });
});

describe('makeRandomNumber', () => {
  it('generates a number of the right length', () => {
    const length = 10;
    const randomNumber = makeRandomNumber(length);
    const randomNumberString = `${randomNumber}`;
    expect(randomNumberString).toHaveLength(length);

    const randomFloat = makeRandomNumber(length, true);
    const randomFloatString = `${randomFloat}`;
    expect(randomFloatString).toHaveLength(length + 1); // we need to include the decimal
  });
  it('only includes a decimal when requested', () => {
    const randomNumber = makeRandomNumber(10);
    const randomNumberString = `${randomNumber}`;
    const randomNumberStringIncludesDecimal = randomNumberString.includes('.');

    expect(randomNumberStringIncludesDecimal).toBe(false);

    const randomFloat = makeRandomNumber(10, true);
    const randomFloatString = `${randomFloat}`;
    const randomFloatStringIncludesDecimal = randomFloatString.includes('.');

    expect(randomFloatStringIncludesDecimal).toBe(true);
  });
});
