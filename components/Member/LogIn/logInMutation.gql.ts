import { gql } from '@/__generated__';

const LOG_IN_MUTATION = gql(/* GraphQL */ `
  mutation LOG_IN_MUTATION($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      success
      message
    }
  }
`);

export default LOG_IN_MUTATION;
