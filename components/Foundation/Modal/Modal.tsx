import { ReactNode } from "react";
import { createPortal } from "react-dom";
import StyledModal from "./StyledModal";
import FunctionalIcon from "@/components/icons/FunctionalIcon/FunctionalIcon";
import X from "@/components/icons/X";
import useModal from "./useModal";

interface ModalProps {
  close: () => void; // The function that closes the modal. Needs to come from the component that creates the modal so that it knows the modal has been closed.
  children: ReactNode;
}

const Modal = ({ close, children }: ModalProps): JSX.Element | null => {
  useModal(close);

  const modalElement = (
    <StyledModal>
      <div className="modalMolder">
        <div className="modalContent">{children}</div>
        <FunctionalIcon
          iconName="closeModal"
          titleTextReplacement="Close"
          onTrigger={close}
        >
          <X />
        </FunctionalIcon>
      </div>
    </StyledModal>
  );

  let modalHolder = document.getElementById("modalHolder");

  if (modalHolder == null) {
    // If we didn't find a modalHolder for some reason, let's create one. And in case there's no document object, we'll just spit out the modalElement, because we're clearly already in a real weird environment.
    if (document == null) return modalElement;
    modalHolder = document.createElement("section");
    modalHolder.setAttribute("id", "modalHolder");
    document.body.appendChild(modalHolder);
  }

  return createPortal(modalElement, modalHolder);
};

export default Modal;
