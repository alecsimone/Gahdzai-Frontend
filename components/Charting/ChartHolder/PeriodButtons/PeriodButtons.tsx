import { periods } from './ChartPeriodContextTypes';
import PeriodButton from './PeriodButton';
import StyledPeriodButtons from './StyledPeriodButtons';

// * A simple wrapper for the PeriodButtons. It maps over our periods, defined with the rest of ChartPeriodContext (see import above), and renders a button for each period

const PeriodButtons = (): JSX.Element => {
  const buttons = periods.map((period) => <PeriodButton period={period} />);
  return (
    <StyledPeriodButtons>
      <div className="periodButtonsWrapper">{buttons}</div>
    </StyledPeriodButtons>
  );
};

export default PeriodButtons;
