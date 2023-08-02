import { MemberBoxMemberData } from './useMemberBoxQuery';
import LoggedOutMemberBox from './LoggedOutMemberBox';
import LoggedInMemberBox from './LoggedInMemberBox';

interface MemberBoxWithDataProps {
  data: MemberBoxMemberData;
}

const MemberBoxWithData = ({
  data,
}: MemberBoxWithDataProps): JSX.Element | null => {
  if (data.currentUser) {
    return <LoggedInMemberBox displayName={data.currentUser.displayName} />;
  }

  return <LoggedOutMemberBox />;
};

export default MemberBoxWithData;
