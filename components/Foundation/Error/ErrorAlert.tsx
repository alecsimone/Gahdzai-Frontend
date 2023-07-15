import { useState } from "react";
import Modal from "../Modal";
import Error from "./Error";

interface ErrorAlertProps {
  error: string | { message: string };
}

const ErrorAlert = ({ error }: ErrorAlertProps): JSX.Element | null => {
  const [showingModal, setShowingModal] = useState(true);

  if (showingModal) {
    return (
      <Modal close={() => setShowingModal(false)}>
        <Error error={error} />
      </Modal>
    );
  }
  return null;
};

export default ErrorAlert;
