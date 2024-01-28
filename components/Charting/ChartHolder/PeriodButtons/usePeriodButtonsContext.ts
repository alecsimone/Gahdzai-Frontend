import { useState } from 'react';
import {
  type Period,
  type PeriodContextDataInterface,
  defaultPeriod,
} from './ChartPeriodContextTypes';

// * Creates state to keep track of the currently active period for the chart, and creates an object with that state and its setter that can be sent back to ChartHolder to be put into Context.
type Signature = () => PeriodContextDataInterface;

const useChartPeriodContext: Signature = () => {
  const [activePeriod, setActivePeriod] = useState<Period>(defaultPeriod);

  const chartPeriodContextData: PeriodContextDataInterface = {
    activePeriod,
    setActivePeriod,
  };

  return chartPeriodContextData;
};

export default useChartPeriodContext;
