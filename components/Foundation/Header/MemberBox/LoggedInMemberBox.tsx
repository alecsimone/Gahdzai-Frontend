import Link from 'next/link';
import Button from '@/styles/extendableElements/Button';
import StyledMemberBox from './StyledMemberBox';
import useLogOut from './useLogOut';
import ErrorAlert from '../../Error/ErrorAlert';

interface LoggedInMemberBoxProps {
  displayName: string;
}

const LoggedInMemberBox = ({
  displayName,
}: LoggedInMemberBoxProps): JSX.Element => {
  const [logOut, error] = useLogOut();
  if (error) {
    return <ErrorAlert error={error} />;
  }
  return (
    <StyledMemberBox>
      <Link href="/" className="profileLink">
        {displayName}
      </Link>
      <Button onClick={logOut} className="logOut">
        (Log out)
      </Button>
    </StyledMemberBox>
  );
};

export default LoggedInMemberBox;
