import { gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $displayName: String!
    $email: String!
    $password: String!
  ) {
    createMember(
      data: { displayName: $displayName, email: $email, password: $password }
    ) {
      id
      email
      displayName
    }
  }
`;

export default SIGN_UP_MUTATION;
