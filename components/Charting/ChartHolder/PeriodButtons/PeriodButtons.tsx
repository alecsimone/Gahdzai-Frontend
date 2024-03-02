import { useContext, useState } from 'react';
import Button from '@/styles/extendableElements/Button';
import { PeriodContext, periods } from './ChartPeriodContextTypes';
import PeriodButton from './PeriodButton';
import StyledPeriodButtons from './StyledPeriodButtons';

// * A simple wrapper for the PeriodButtons. It maps over our periods, defined with the rest of ChartPeriodContext (see import above), and renders a button for each period

const PeriodButtons = (): JSX.Element => {
  const { activePeriod } = useContext(PeriodContext);

  const [expanded, setExpanded] = useState(false);

  let buttons;
  if (expanded) {
    buttons = periods.map((period) => (
      <PeriodButton period={period} setExpanded={setExpanded} />
    ));
  } else {
    buttons = [
      <Button
        className={`period ${activePeriod} active`}
        onClick={() => setExpanded(true)}
      >
        {activePeriod}
      </Button>,
    ];
  }

  return (
    <StyledPeriodButtons className={expanded ? 'expanded' : 'collapsed'}>
      <div className="periodButtonsWrapper">{buttons}</div>
    </StyledPeriodButtons>
  );
};

export default PeriodButtons;
