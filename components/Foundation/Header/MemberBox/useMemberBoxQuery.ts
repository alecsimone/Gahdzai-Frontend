import { QueryResult, useQuery } from "@apollo/client";
import MEMBER_BOX_QUERY from "./memberBoxQuery";

interface memberDataInterface {
  displayName: string;
  avatar: string | null;
}

export type { memberDataInterface };

interface memberBoxMemberData {
  currentUser: memberDataInterface | null;
}

export type { memberBoxMemberData };

const useMemberBoxQuery = (): QueryResult<memberBoxMemberData> => {
  const result = useQuery<memberBoxMemberData>(MEMBER_BOX_QUERY, {
    // eslint-disable-next-line no-console
    onCompleted: (data) => console.log(data),
    onError: (e) => console.log(e),
  });
  return result;
};

export default useMemberBoxQuery;
