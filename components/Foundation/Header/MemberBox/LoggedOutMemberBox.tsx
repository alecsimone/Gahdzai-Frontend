import { useState } from 'react';
import LogIn from '@/components/Member/LogIn';
import Button from '@/styles/extendableElements/Button';
import SignUp from '@/components/Member/SignUp/SignUp';
import StyledMemberBox from './StyledMemberBox';
import Modal from '../../Modal/Modal';

// interface LoggedOutMemberBoxProps {}

const LoggedOutMemberBox = (): JSX.Element => {
  const [showingSignUp, setShowingSignUp] = useState(false);
  const [showingLogIn, setShowingLogIn] = useState(false);

  return (
    <StyledMemberBox className="loggedOut">
      <Button className="prompt signUp" onClick={() => setShowingSignUp(true)}>
        Sign up
      </Button>
      or
      <Button className="prompt logIn" onClick={() => setShowingLogIn(true)}>
        Log in
      </Button>
      {showingSignUp && (
        <Modal close={() => setShowingSignUp(false)}>
          <SignUp closeModal={() => setShowingSignUp(false)} />
        </Modal>
      )}
      {showingLogIn && (
        <Modal close={() => setShowingLogIn(false)}>
          <LogIn />
        </Modal>
      )}
    </StyledMemberBox>
  );
};

export default LoggedOutMemberBox;
