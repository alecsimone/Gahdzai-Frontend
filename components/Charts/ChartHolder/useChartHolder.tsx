import { useState, type Dispatch, type SetStateAction } from 'react';
import { ApolloError } from '@apollo/client';
import { type Get_Index_Data_QueryQuery } from '@/__generated__/graphql';
import useHighlightContext from './Contexts/useHighlightContext';
import useIndicesQuery from './useIndicesQuery';
import useChartPeriodContext from './Contexts/useChartPeriodContext';
import { type HighlightContextDataObjectInterface } from './Contexts/HighlightContext';
import { type PeriodContextDataInterface } from './Contexts/ChartPeriodContext';

// * The master hook for ChartHolder. See the various functions it calls for more details on them. The only thing it does itself is create state to hold any legend items the chart might create
type Signature = () => {
  data: Get_Index_Data_QueryQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  legendElements: JSX.Element[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightContextData: HighlightContextDataObjectInterface;
  chartPeriodContextData: PeriodContextDataInterface;
};

const useChartHolder: Signature = () => {
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
