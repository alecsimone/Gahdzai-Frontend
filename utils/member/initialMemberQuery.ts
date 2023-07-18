import { gql } from "@apollo/client";
import { memberBoxFields } from "@/components/Foundation/Header/MemberBox/memberBoxQuery";

const INITIAL_MEMBER_QUERY = gql`
  ${memberBoxFields}
  query INITIAL_MEMBER_QUERY {
    currentUser {
      ... on User {
        id
        role
        ...MemberBoxFields
      }
    }
  }
`;
export default INITIAL_MEMBER_QUERY;
