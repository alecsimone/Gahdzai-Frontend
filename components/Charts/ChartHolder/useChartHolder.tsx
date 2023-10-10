import { useState } from 'react';
import useHighlightContext from './Contexts/useHighlightContext';
import useIndicesQuery from './useIndicesQuery';
import useChartPeriodContext from './Contexts/useChartPeriodContext';

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<JSX.Element[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);

  const highlightContextData = useHighlightContext();
  const chartPeriodContextData = useChartPeriodContext();

  const { data, loading, error } = useIndicesQuery(
    chartPeriodContextData.activePeriod
  );

  return {
    data,
    loading,
    error,
    legendElements,
    setLegendElements,
    highlightContextData,
    chartPeriodContextData,
  };
};

export default useChartHolder;
