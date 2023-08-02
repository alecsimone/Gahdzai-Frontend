import { QueryResult, useQuery } from '@apollo/client';
import MEMBER_BOX_QUERY from './memberBoxQuery.gql';

interface MemberDataInterface {
  displayName: string;
  avatar: string | null;
}

export type { MemberDataInterface };

interface MemberBoxMemberData {
  currentUser: MemberDataInterface | null;
}

export type { MemberBoxMemberData };

const useMemberBoxQuery = (): QueryResult<MemberBoxMemberData> => {
  const result = useQuery<MemberBoxMemberData>(MEMBER_BOX_QUERY);
  return result;
};

export default useMemberBoxQuery;
