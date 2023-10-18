import { Period } from '../../ChartHolder/Contexts/ChartPeriodContext';

// * Given a time period for a chart, it returns the resolution for that chart. Because we'll filter down our data to get a quantity that fits nicely on the screen later, the only thing we're worried about here is not getting a totally unwieldy amount of data. So this is just a rough conversion to an appropriate resolution

type Signature = (period: Period) => string;

const getQueryResolution: Signature = (period) => {
  switch (period) {
    case 'D':
      return '1';
    case 'W':
      return '5';
    case 'M':
      return '30';
    case '6M':
      return '3H';
    case 'Y':
      return 'D';
    case 'Max':
      return 'M';
    default:
      return '1';
  }
};

export default getQueryResolution;
