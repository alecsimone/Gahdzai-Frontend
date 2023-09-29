import { useQuery } from '@apollo/client';
import { useState } from 'react';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import { resolution } from '../Chart/constants';
import getQueryTimeBoundaries from './getQueryTimeBoundaries';

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<JSX.Element[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);

  const [previousClose, nextClose] = getQueryTimeBoundaries();

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
  console.log(data);
  return { data, loading, error, legendElements, setLegendElements };
};

export default useChartHolder;
