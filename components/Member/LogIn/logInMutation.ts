import { gql } from '@apollo/client';

const LOG_IN_MUTATION = gql`
  mutation LOG_IN_MUTATION($email: String!, $password: String!) {
    authenticateMemberWithPassword(email: $email, password: $password) {
      ... on MemberAuthenticationWithPasswordSuccess {
        item {
          id
        }
      }
      ... on MemberAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default LOG_IN_MUTATION;
