import StyledError from "./StyledError";

interface ErrorProps {
  error?: string | { message: string } | null;
}

const Error = ({ error }: ErrorProps): JSX.Element | null => {
  // If we don't have an error to display, we return nothing
  if (error == null) return null;

  let errorMessage: string;
  // If we get the error as a string, we just display it as the errorMessage
  if (typeof error === "string") {
    errorMessage = error;

    // If we get the error as an object, we pull the errorMessage out of its message property
  } else if (
    typeof error === "object" &&
    !Array.isArray(error) && // Arrays technically have typeof object, but we don't want them
    error !== null // same for null
  ) {
    if (error.message != null) {
      errorMessage = error.message;
    } else {
      return null;
    }
  } else {
    return null;
  }

  return (
    <StyledError className="errorBox">
      <h4>Error:</h4>
      <div className="message">{errorMessage}</div>
    </StyledError>
  );
};

export default Error;
