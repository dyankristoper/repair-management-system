import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  @keyframes popup {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 1rem 2rem;
  animation: popup 0.3s ease-in-out forwards; /* Trigger the keyframes */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -2em;
  top: -2.6em;
  padding: 1em;
  border-radius: 50%;
  border: none;
  margin: 0.2em;

  &:active {
    border: 3px solid var(--color-red-600);
  }
`;

const ModalWindowContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalWindowContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalWindowContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalWindowContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalWindowContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <CloseButton onClick={close}>
          <RiCloseFill />
        </CloseButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
