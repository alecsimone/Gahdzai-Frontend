import { DocumentNode } from 'graphql';
import INITIAL_MEMBER_QUERY from 'utils/member/initialMemberQuery';
import initializeApollo, {
  saveApolloCacheInPageProps,
} from './apollo/apolloHandlers';

interface queryInterface {
  query: DocumentNode;
  variables?: {
    [key: string]: unknown;
  };
}

const runServerSideQueries = async (
  context: any,
  queries: queryInterface[] = []
) => {
  const { cookie } = context.req.headers;
  const apolloClient = initializeApollo(cookie);

  // We want every page to include the initial member query, so we'll add it here
  const queriesWithMemberQuery = queries.concat({
    query: INITIAL_MEMBER_QUERY,
  });

  const queryResults = [];
  for (const query of queriesWithMemberQuery) {
    const queryObject: queryInterface = {
      query: query.query,
    };
    if (query.variables) {
      queryObject.variables = query.variables;
    }

    queryResults.push(apolloClient.query(queryObject));
  }
  // Because we're just trying to get this data into the apollo cache, we don't have to do anything with it, but we do have to wait until it's been fetched
  await Promise.all(queryResults);

  return saveApolloCacheInPageProps(apolloClient, {
    props: {},
  });
};
export default runServerSideQueries;
