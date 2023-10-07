import { periods } from '../ChartPeriodContext';
import PeriodButton from './PeriodButton';
import StyledPeriodButtons from './StyledPeriodButtons';

// interface PeriodButtonsProps {}

const PeriodButtons = (): JSX.Element => {
  const buttons = periods.map((period) => <PeriodButton period={period} />);
  return (
    <StyledPeriodButtons>
      <div className="periodButtonsWrapper">{buttons}</div>
    </StyledPeriodButtons>
  );
};

export default PeriodButtons;
