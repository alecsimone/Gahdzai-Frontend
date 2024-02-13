import { type SetStateAction, type Dispatch } from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import type { ChartTypes } from '../ChartHolder/types';
import MainChart from './MainChart';
import ShadowChart from './ShadowChart/ShadowChart';
import useUsableBoundaries from './useUsableBoundaries';
import useChartData from './useChartData';

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
  const usableBoundaries = useUsableBoundaries();
  const { data, chartDataRange, coordinatedData } = useChartData({
    rawData,
    period,
    chartType,
  });

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
