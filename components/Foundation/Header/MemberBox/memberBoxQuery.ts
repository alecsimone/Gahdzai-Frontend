import { gql } from '@apollo/client';

const memberBoxFields = gql`
  fragment MemberBoxFields on Member {
    displayName
    rep
    avatar
  }
`;
export { memberBoxFields };

const MEMBER_BOX_QUERY = gql`
  ${memberBoxFields}
  query MEMBER_BOX_QUERY {
    authenticatedItem {
      ... on Member {
        ...MemberBoxFields
      }
    }
  }
`;
export default MEMBER_BOX_QUERY;
