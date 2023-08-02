import Error from '@/components/Foundation/Error';
import cookieWarning from '../cookieWarning';
import StyledSignUp from './StyledSignUp';
import useSignUp from './useSignUp';

interface SignUpProps {
  closeModal?: () => void;
}

const SignUp = ({ closeModal }: SignUpProps): JSX.Element => {
  const [form, signUpError] = useSignUp(closeModal);

  return (
    <StyledSignUp>
      <Error error={signUpError} />
      {form}
      <p className="cookieWarning">{cookieWarning}</p>
    </StyledSignUp>
  );
};

export default SignUp;
