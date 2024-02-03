import { type SetStateAction, type Dispatch, useRef } from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import type { ChartTypes } from '../ChartHolder/types';
import MainChart from './MainChart';
import ShadowChart from './ShadowChart/ShadowChart';

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
}: ChartBaseProps): React.ReactNode => {
  const usableHeight = useRef(0);
  const usableWidth = useRef(0);
  const usableBoundaries = { usableHeight, usableWidth };

  return (
    <div className="chartContainer">
      <MainChart
        rawData={rawData}
        period={period}
        chartType={chartType}
        usableBoundaries={usableBoundaries}
        setLegendElements={setLegendElements}
      />
      <ShadowChart usableBoundaries={usableBoundaries} />
    </div>
  );
};

export default ChartBase;
