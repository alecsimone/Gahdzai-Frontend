import Error from '@/components/Foundation/Error/Error';
import StyledSignUp from '../SignUp/StyledSignUp';
import useLogIn from './useLogIn';
import cookieWarning from '../cookieWarning';

// interface LogInProps {}

const LogIn = (): JSX.Element => {
  const [form, logInSuccess, logInError] = useLogIn();

  if (logInSuccess) {
    return (
      <StyledSignUp>
        <div className="success">Success!</div>
      </StyledSignUp>
    );
  }

  return (
    <StyledSignUp>
      <Error error={logInError} />
      {form}
      {/* <Button className="resetPassword" onClick={() => setShowingReset(true)}>
        Forgot password?
      </Button> */}
      <p className="cookieWarning">{cookieWarning}</p>
    </StyledSignUp>
  );
};

export default LogIn;
