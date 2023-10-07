import Button from '@/styles/extendableElements/Button';
import { Period } from '../ChartPeriodContext';
import usePeriodButton from './usePeriodButton';

interface PeriodButtonProps {
  period: Period;
}

const PeriodButton = ({ period }: PeriodButtonProps): JSX.Element => {
  const { buttonRef, isActive } = usePeriodButton(period);

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
