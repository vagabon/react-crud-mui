import { useCallback, useState } from 'react';

export interface IModalReturnProps {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): IModalReturnProps => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  return { open, openModal, closeModal };
};
