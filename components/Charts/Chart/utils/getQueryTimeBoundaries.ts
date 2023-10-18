import getNextClose from './getNextClose';
import getPeriodStart from './getPeriodStart';
import { Period } from '../../ChartHolder/Contexts/ChartPeriodContext';

// * Gets the start and end time for a chart data query based on the currently active period
type Signature = (period: Period) => [number, number];

const getQueryTimeBoundaries: Signature = (period) => {
  const previousClose = getPeriodStart(period);
  const nextClose = getNextClose();

  return [previousClose, nextClose];
};

export default getQueryTimeBoundaries;
