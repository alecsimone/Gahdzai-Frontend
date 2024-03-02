import type { Dispatch, SetStateAction } from 'react';
import Button from '@/styles/extendableElements/Button';
import { type Period } from './ChartPeriodContextTypes';
import usePeriodButton from './usePeriodButton';

// * A button that chooses the period for a chart (and displays an active state if its period is currently active). Each button represents one period.

interface PeriodButtonProps {
  period: Period;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const PeriodButton = ({
  period,
  setExpanded,
}: PeriodButtonProps): JSX.Element => {
  const { isActive, setActivePeriod } = usePeriodButton(period);

  return (
    <Button
      className={`period ${period} ${isActive ? 'active' : 'inactive'}`}
      onClick={() => {
        if (isActive) {
          setExpanded(false);
        } else {
          setActivePeriod(period);
        }
      }}
      key={period}
    >
      {period}
    </Button>
  );
};

export default PeriodButton;
