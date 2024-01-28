import { useContext, type Dispatch, type SetStateAction } from 'react';
import { type Period, PeriodContext } from './ChartPeriodContextTypes';

// * The hook for our PeriodButtons. It pulls the activePeriod and its setter out of context and then does a simple check to figure out if this button corresponds to the currently active period.

type Signature = (period: Period) => {
  isActive: boolean;
  setActivePeriod: Dispatch<SetStateAction<Period>>;
};

const usePeriodButton: Signature = (period) => {
  const { activePeriod, setActivePeriod } = useContext(PeriodContext);

  const isActive = activePeriod === period;
  return { isActive, setActivePeriod };
};

export default usePeriodButton;
