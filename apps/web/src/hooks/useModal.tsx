import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(['오류가 발생했습니다.']);

  const openModal = (message: string[]) => {
    setMessage(message);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    message,
    openModal,
    closeModal,
  };
};

export default useModal;
