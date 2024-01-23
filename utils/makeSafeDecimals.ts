// * Takes in a value that's either a string or a number and returns a number with two decimal points

const makeSafeDecimals = (number: number | string) => {
  let definitelyNumber: number;
  if (typeof number === 'string') {
    definitelyNumber = parseFloat(number);
  } else {
    definitelyNumber = number;
  }

  const safeDecimal = Math.round(definitelyNumber * 100) / 100;
  return safeDecimal;
};

export default makeSafeDecimals;
