import Modal from 'react-modal';
import Styled, { ModalStyles } from './index.styles';

interface CustomModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function CustomModal({ children, isOpen, onClose }: CustomModalProps) {
  return (
    <Styled.ModalContainer>
      {isOpen ? (
        <Modal
          style={ModalStyles}
          isOpen={isOpen}
          // onRequestClose={onClose}
          className="modal"
          ariaHideApp={false}
        >
          <Styled.ModalContent>{children}</Styled.ModalContent>
          <Styled.ModalButton onClick={onClose}>확인</Styled.ModalButton>
        </Modal>
      ) : null}
    </Styled.ModalContainer>
  );
}

export default CustomModal;
