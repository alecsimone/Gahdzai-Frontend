import { randomNumberInclusive } from '../primitives/makeRandomNumber';

const earliest = 1514764800; // 1/1/2018 @ 12:00:00 AM
const latest = Math.floor(new Date().getTime() / 1000); // 1/1/2018 @ 12:00:00 AM

const makeRandomTimestamp = (isMs: boolean = false) => {
  if (isMs) {
    return randomNumberInclusive(earliest * 1000, latest * 1000);
  }
  return randomNumberInclusive(earliest, latest);
};

export default makeRandomTimestamp;
