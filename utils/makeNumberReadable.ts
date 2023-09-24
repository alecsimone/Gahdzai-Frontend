const makeNumberReadable = (number: number) => {
  const roundedNumber = Math.round(number * 100) / 100;

  const formattedNumber = roundedNumber.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
};

export default makeNumberReadable;
