import { gql } from '@/__generated__';

const memberBoxFields = gql(/* GraphQL */ `
  fragment MemberBoxFields on User {
    displayName
    avatar
  }
`);
export { memberBoxFields };

const MEMBER_BOX_QUERY = gql(/* GraphQl */ `
  query MEMBER_BOX_QUERY {
    currentUser {
      ...MemberBoxFields
    }
  }
`);
export default MEMBER_BOX_QUERY;
