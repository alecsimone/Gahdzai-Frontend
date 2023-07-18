import ErrorAlert from "../../Error/ErrorAlert";
import MemberBoxWithData from "./MemberBoxWithData";
import StyledMemberBox from "./StyledMemberBox";
import useMemberBoxQuery from "./useMemberBoxQuery";

interface MemberBoxProps {}

const MemberBox = ({}: MemberBoxProps): JSX.Element => {
  const { data, loading, error } = useMemberBoxQuery();

  if (data) {
    return <MemberBoxWithData data={data} />;
  }

  if (loading) {
    return <StyledMemberBox>Authenticating...</StyledMemberBox>;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return <StyledMemberBox>Unknown Error</StyledMemberBox>;
};

export default MemberBox;
