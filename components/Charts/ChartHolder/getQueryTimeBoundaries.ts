import getNextClose from './getNextClose';
import getPreviousClose from './getPreviousClose';
import { Period } from './ChartPeriodContext';

const getQueryTimeBoundaries = (period: Period): [number, number] => {
  const startDate = new Date();
  const previousClose = getPreviousClose(startDate, period);

  const endDate = new Date();
  const nextClose = getNextClose(endDate);

  return [previousClose, nextClose];
};

export default getQueryTimeBoundaries;
