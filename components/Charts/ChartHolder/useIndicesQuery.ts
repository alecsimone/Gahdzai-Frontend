import { useQuery } from '@apollo/client';
import getQueryTimeBoundaries from './getQueryTimeBoundaries';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import { resolution } from '../Chart/constants';

const useIndicesQuery = () => {
  const [previousClose, nextClose] = getQueryTimeBoundaries();
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
