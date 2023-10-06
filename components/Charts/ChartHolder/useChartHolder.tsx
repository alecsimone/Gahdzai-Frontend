import { useState } from 'react';
import useHighlightContext from './useHighlightContext';
import useIndicesQuery from './useIndicesQuery';

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<JSX.Element[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);

  const highlightContextData = useHighlightContext();

  const { data, loading, error } = useIndicesQuery();

  return {
    data,
    loading,
    error,
    legendElements,
    setLegendElements,
    highlightContextData,
  };
};

export default useChartHolder;
