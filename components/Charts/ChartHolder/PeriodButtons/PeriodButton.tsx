import { useCallback, useContext, useEffect, useRef } from 'react';
import Button from '@/styles/extendableElements/Button';
import { Period, PeriodContext } from '../ChartPeriodContext';

interface PeriodButtonProps {
  period: Period;
}

const PeriodButton = ({ period }: PeriodButtonProps): JSX.Element => {
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
  return (
    <Button
      className={`period ${period} ${isActive ? 'active' : 'inactive'}`}
      ref={buttonRef}
    >
      {period}
    </Button>
  );
};

export default PeriodButton;
