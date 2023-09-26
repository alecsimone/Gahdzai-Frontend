export const randomNumberInclusive = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomDigit = () => randomNumberInclusive(0, 9);

const makeRandomNumber = (
  length: number,
  hasDecimal: boolean = false
): number => {
  if (length <= 0) {
    throw new Error('Length must be greater than 0.');
  }

  if (hasDecimal && length < 2) {
    throw new Error('Length must be at least 2 for numbers with decimals.');
  }

  const integerDigits: number[] = [];
  const decimalDigits: number[] = [];

  if (hasDecimal) {
    const integerLength = randomNumberInclusive(1, length - 1);
    integerDigits.push(randomNumberInclusive(1, 9)); // We need to make sure there's at least one digit before the decimal

    for (let i = 0; i < integerLength - 1; i += 1) {
      integerDigits.push(randomDigit());
    }

    const decimalLength = length - integerLength;
    for (let i = 0; i < decimalLength; i += 1) {
      decimalDigits.push(randomDigit());
    }
  } else {
    integerDigits.push(randomNumberInclusive(1, 9));
    for (let i = 0; i < length - 1; i += 1) {
      integerDigits.push(randomDigit());
    }
  }

  const integerPart = parseInt(integerDigits.join(''), 10);
  const decimalPart =
    decimalDigits.length > 0 ? parseFloat(`0.${decimalDigits.join('')}`) : 0;

  return integerPart + decimalPart;
};

export default makeRandomNumber;
