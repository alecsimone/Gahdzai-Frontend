import type { SetStateAction, Dispatch } from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import StyledChart from './StyledChart';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import type { ChartTypes } from '../ChartHolder/types';
import MainChart from './MainChart';

// * Our main Chart component. Its responsibility is to render the data we receive from our query as a chart, which it splits into two parts: The main Chart canvas, which will have the actual chart, and then a ShadowChart canvas that will hold any annotations on that chart, eg the crosshairs that follow the mouse
interface ChartBaseProps {
  rawData: Get_Candles_For_Symbols_QueryQuery;
  chartType: ChartTypes;
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>;
  period: Period;
}

const ChartBase = ({
  rawData,
  chartType,
  setLegendElements,
  period,
}: ChartBaseProps): React.ReactNode => (
  <div className="chartContainer">
    <MainChart rawData={rawData} period={period} chartType={chartType} />
    <StyledChart className="shadow">
      A shadow chart for annotating the main chart
    </StyledChart>
  </div>
);

export default ChartBase;
