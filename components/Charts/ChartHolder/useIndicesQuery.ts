import { useQuery } from '@apollo/client';
import getQueryTimeBoundaries from './getQueryTimeBoundaries';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import getQueryResolution from './getQueryResolution';
import { Period } from './ChartPeriodContext';

const useIndicesQuery = (period: Period) => {
  const [previousClose, nextClose] = getQueryTimeBoundaries(period);
  const resolution = getQueryResolution(period);

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
  console.log(data);

  return { data, loading, error };
};

export default useIndicesQuery;
