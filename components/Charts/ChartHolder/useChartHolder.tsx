import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import { resolution } from '../Chart/constants';
import getQueryTimeBoundaries from './getQueryTimeBoundaries';
import {
  HighlightContextDataObjectInterface,
  HighlightedSymbols,
} from './HighlightContext';

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<JSX.Element[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);
  const [highlightedSymbols, setHighlightedSymbols] = useState<
    HighlightedSymbols[]
  >([]);

  const highlightContextData: HighlightContextDataObjectInterface = {
    setHighlightedSymbols,
    highlightedSymbols,
  };

  const [previousClose, nextClose] = getQueryTimeBoundaries();

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
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
