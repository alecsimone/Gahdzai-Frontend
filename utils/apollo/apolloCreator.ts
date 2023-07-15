/* eslint-disable no-console */
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { endpoint } from 'globalConstants';

interface UploadLinkOptions {
  uri: string;
  credentials: 'include';
  headers?: {
    cookie: string;
  };
}
const uploadLinkCreator = (cookie: string | null) => {
  const options: UploadLinkOptions = {
    uri: endpoint,
    credentials: 'include',
  };

  if (cookie != null) {
    options.headers = {
      cookie,
    };
  }

  const uploadLink = createUploadLink(options);
  return uploadLink;
};

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (operation?.operationName) {
    console.log(`Error in ${operation.operationName}`);
  }
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      console.log(`[GraphQL error] - ${extensions?.code}: ${message}`);
    });

  if (networkError) {
    console.log(
      `[Network error] - [${networkError?.name}]: ${networkError.message}`
    );
  }
});

const createApolloClient = (cookie: string | null) =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, uploadLinkCreator(cookie)]),
    cache: new InMemoryCache(),
  });

export default createApolloClient;
