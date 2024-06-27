import styled from 'styled-components';
import ReactModal from 'react-modal';
import { COLOR } from '../../styles/constants';

export const ModalStyles: ReactModal.Styles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '430px',
    height: '230px',
    backgroundColor: COLOR.white,
    borderRadius: '16px',

    // padding: '50px',
    // zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ModalContainer = styled.div`
  position: 'relative';
`;

const ModalContent = styled.div`
  position: absolute;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  top: 40px;
  bottom: 136px;
  right: 105px;
  left: 32px;
  /* background-color: pink; */
`;

const ModalButton = styled.button`
  position: absolute;
  top: 170px;
  left: 353px;
  color: ${COLOR.primaryPurple};
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  padding: 4px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export default { ModalContainer, ModalContent, ModalButton };
