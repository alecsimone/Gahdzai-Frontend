import { gql } from "@/__generated__";

const INITIAL_MEMBER_QUERY = gql(/* GraphQL */ `
  query INITIAL_MEMBER_QUERY {
    currentUser {
      id
      role
      ...MemberBoxFields
    }
  }
`);
export default INITIAL_MEMBER_QUERY;
