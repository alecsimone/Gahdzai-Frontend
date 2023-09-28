import getNextClose from './getNextClose';
import getPreviousClose from './getPreviousClose';

const getQueryTimeBoundaries = (): [number, number] => {
  const startDate = new Date();
  const previousClose = getPreviousClose(startDate);

  const endDate = new Date();
  const nextClose = getNextClose(endDate);

  return [previousClose, nextClose];
};

export default getQueryTimeBoundaries;
