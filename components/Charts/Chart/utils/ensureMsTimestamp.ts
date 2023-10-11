// * Takes in an unsafe representation of a date and returns a number that represents a proper timestamp in milliseconds. The unsafe representation might be a date object, or it might be a string or number. If it's a string or number, it might be in seconds or milliseconds.
type Signature = (unsafeTimestamp: string | number | Date) => number;

const ensureMsTimestamp: Signature = (unsafeTimestamp) => {
  let properTimestamp: number;
  if (typeof unsafeTimestamp === 'string') {
    properTimestamp = parseInt(unsafeTimestamp, 10);
  } else if (unsafeTimestamp instanceof Date) {
    properTimestamp = unsafeTimestamp.getTime();
  } else {
    properTimestamp = unsafeTimestamp;
  }
  if (properTimestamp < 99999999999) {
    // We can safely assume that a 11 digit number represents a timestamp in seconds
    properTimestamp *= 1000;
  }

  return properTimestamp;
};

export default ensureMsTimestamp;
