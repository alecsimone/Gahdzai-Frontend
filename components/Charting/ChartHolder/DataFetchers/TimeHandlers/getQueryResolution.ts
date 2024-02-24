import { Timespan } from '@/__generated__/graphql';
import { type Period } from '../../PeriodButtons/ChartPeriodContextTypes';

// export type Timespans =
//   | 'second'
//   | 'minute'
//   | 'hour'
//   | 'day'
//   | 'week'
//   | 'month'
//   | 'quarter'
//   | 'year';

// * Given a time period for a chart, it returns the resolution for that chart. Because we'll filter down our data to get a quantity that fits nicely on the screen later, the only thing we're worried about here is not getting a totally unwieldy amount of data. So this is just a rough conversion to an appropriate resolution

type Signature = (period: Period) => {
  timespan: Timespan;
  timespanMultiplier: number;
};

const getQueryResolution: Signature = (period) => {
  switch (period) {
    case 'D':
      return { timespan: Timespan.Minute, timespanMultiplier: 1 };
    case 'W':
      return { timespan: Timespan.Minute, timespanMultiplier: 5 };
    case 'M':
      return { timespan: Timespan.Minute, timespanMultiplier: 30 };
    case '6M':
      return { timespan: Timespan.Hour, timespanMultiplier: 3 };
    case 'Y':
      return { timespan: Timespan.Day, timespanMultiplier: 1 };
    case 'Max':
      return { timespan: Timespan.Month, timespanMultiplier: 1 };
    default:
      return { timespan: Timespan.Minute, timespanMultiplier: 1 };
  }
};

export default getQueryResolution;
