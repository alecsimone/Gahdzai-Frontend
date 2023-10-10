import { useQuery } from '@apollo/client';
import getQueryTimeBoundaries from '../Chart/utils/getQueryTimeBoundaries';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import getQueryResolution from '../Chart/utils/getQueryResolution';
import { Period } from './Contexts/ChartPeriodContext';

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

  return { data, loading, error };
};

export default useIndicesQuery;
