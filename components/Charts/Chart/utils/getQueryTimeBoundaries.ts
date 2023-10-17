import getNextClose from './getNextClose';
import getPeriodStart from './getPeriodStart';
import { Period } from '../../ChartHolder/Contexts/ChartPeriodContext';

const getQueryTimeBoundaries = (period: Period): [number, number] => {
  const previousClose = getPeriodStart(period);
  const nextClose = getNextClose();

  return [previousClose, nextClose];
};

export default getQueryTimeBoundaries;
