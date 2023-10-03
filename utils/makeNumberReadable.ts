const makeNumberReadable = ({
  number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: {
  number: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) => {
  const roundedNumber = Math.round(number * 100) / 100;

  const formattedNumber = roundedNumber.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formattedNumber;
};

export default makeNumberReadable;
