import { gql } from '@/__generated__';

const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SIGN_UP_MUTATION(
    $displayName: String!
    $email: String!
    $password: String!
  ) {
    createUser(displayName: $displayName, email: $email, password: $password) {
      id
      email
      displayName
    }
  }
`);

export default SIGN_UP_MUTATION;
