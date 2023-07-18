import { memberBoxMemberData } from "./useMemberBoxQuery";
import LoggedOutMemberBox from "./LoggedOutMemberBox";
import Link from "next/link";
import StyledMemberBox from "./StyledMemberBox";

interface MemberBoxWithDataProps {
  data: memberBoxMemberData;
}

const MemberBoxWithData = ({
  data,
}: MemberBoxWithDataProps): JSX.Element | null => {
  console.log(data);

  if (data.currentUser) {
    return (
      <StyledMemberBox>
        <Link href="/" className="profileLink">
          {data.currentUser.displayName}
        </Link>
      </StyledMemberBox>
    );
  }

  return <LoggedOutMemberBox />;
};

export default MemberBoxWithData;
