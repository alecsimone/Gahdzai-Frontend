// * Takes in a number and formats it in a pretty, readable way for display purposes
type Signature = (obj: {
  number: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) => string;

const makeNumberReadable: Signature = ({
  number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}) => {
  const roundedNumber = Math.round(number * 100) / 100;

  const formattedNumber = roundedNumber.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formattedNumber;
};

export default makeNumberReadable;
