import { useCallback, useContext, useEffect, useRef } from 'react';
import { Period, PeriodContext } from '../Contexts/ChartPeriodContext';

const usePeriodButton = (period: Period) => {
  const { activePeriod, setActivePeriod } = useContext(PeriodContext);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const makeActive = useCallback(
    () => setActivePeriod(period),
    [period, setActivePeriod]
  );

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('click', makeActive);
      return () => {
        button.removeEventListener('click', makeActive);
      };
    }
    return () => {};
  }, [makeActive]);

  const isActive = activePeriod === period;
  return { buttonRef, isActive };
};

export default usePeriodButton;
