import { useState } from 'react';
import {
  Period,
  PeriodContextDataInterface,
  defaultPeriod,
} from './ChartPeriodContext';

const useChartPeriodContext = () => {
  const [activePeriod, setActivePeriod] = useState<Period>(defaultPeriod);

  const chartPeriodContextData: PeriodContextDataInterface = {
    activePeriod,
    setActivePeriod,
  };

  return chartPeriodContextData;
};

export default useChartPeriodContext;
