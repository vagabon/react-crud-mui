import { useCallback, useState } from 'react';
import { ID } from '../../dto/api/ApiDto';

export interface IModalReturnProps {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleYes: (id: ID, callback?: (id: ID) => void) => () => void;
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

  const handleYes = useCallback(
    (id: ID, callback?: (id: ID) => void) => () => {
      closeModal();
      callback?.(id);
    },
    [closeModal],
  );

  return { open, openModal, closeModal, handleYes };
};
