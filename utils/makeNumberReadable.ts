// * Takes in a number and formats it in a pretty, readable way for display purposes
type Input =
  | {
      number: number;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  | number;

type Signature = (input: Input) => string;

const makeNumberReadable: Signature = (input) => {
  let number: number;
  let minimumDigits: number = 2;
  let maximumDigits: number = 2;

  if (typeof input === 'number') {
    number = input;
  } else {
    const {
      number: numberFromObject,
      minimumFractionDigits = 2,
      maximumFractionDigits = 2,
    } = input;
    number = numberFromObject;
    minimumDigits = minimumFractionDigits;
    maximumDigits = maximumFractionDigits;
  }

  const formattedNumber = number.toLocaleString('en-US', {
    minimumFractionDigits: minimumDigits,
    maximumFractionDigits: maximumDigits,
  });

  return formattedNumber;
};

export default makeNumberReadable;
