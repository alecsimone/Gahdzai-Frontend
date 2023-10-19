import Button from '@/styles/extendableElements/Button';
import { Period } from '../Contexts/ChartPeriodContext';
import usePeriodButton from './usePeriodButton';

// * A button that chooses the period for a chart (and displays an active state if its period is currently active). Each button represents one period.

interface PeriodButtonProps {
  period: Period;
}

const PeriodButton = ({ period }: PeriodButtonProps): JSX.Element => {
  const { isActive, setActivePeriod } = usePeriodButton(period);

  return (
    <Button
      className={`period ${period} ${isActive ? 'active' : 'inactive'}`}
      onClick={() => setActivePeriod(period)}
    >
      {period}
    </Button>
  );
};

export default PeriodButton;
