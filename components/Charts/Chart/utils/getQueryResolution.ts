import { Period } from '../../ChartHolder/Contexts/ChartPeriodContext';

const getQueryResolution = (period: Period): string => {
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
