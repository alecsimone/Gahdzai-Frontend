import { type SetStateAction, type Dispatch, useRef } from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import type { ChartTypes } from '../ChartHolder/types';
import MainChart from './MainChart';
import type { CoordinatedDataPoint } from './types';
import cookRawData from './DataWranglers/cookRawData';
import getChartDataRange from './ChartShapers/getChartDataRange';
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

  const coordinatedData = useRef<CoordinatedDataPoint[]>([]);

  const data = cookRawData(rawData, period, chartType);
  const chartDataRange = getChartDataRange(data);

  return (
    <div className="chartContainer">
      <MainChart
        data={data}
        chartType={chartType}
        usableBoundaries={usableBoundaries}
        setLegendElements={setLegendElements}
        coordinatedData={coordinatedData.current}
        chartDataRange={chartDataRange}
      />
      <ShadowChart
        usableBoundaries={usableBoundaries}
        coordinatedData={coordinatedData.current}
        chartDataRange={chartDataRange}
        chartType={chartType}
      />
    </div>
  );
};

export default ChartBase;
