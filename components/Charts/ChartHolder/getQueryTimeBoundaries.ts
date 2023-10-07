import getNextClose from './getNextClose';
import getPreviousClose from './getPreviousClose';
import { Period } from './ChartPeriodContext';

const getQueryTimeBoundaries = (period: Period): [number, number] => {
  const previousClose = getPreviousClose(period);
  const nextClose = getNextClose();

  return [previousClose, nextClose];
};

export default getQueryTimeBoundaries;
