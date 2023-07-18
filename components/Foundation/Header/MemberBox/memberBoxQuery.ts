import { gql } from "@apollo/client";

const memberBoxFields = gql`
  fragment MemberBoxFields on User {
    displayName
    avatar
  }
`;
export { memberBoxFields };

const MEMBER_BOX_QUERY = gql`
  ${memberBoxFields}
  query MEMBER_BOX_QUERY {
    currentUser {
      ... on User {
        ...MemberBoxFields
      }
    }
  }
`;
export default MEMBER_BOX_QUERY;
