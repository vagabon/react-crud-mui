import { useModal } from '../../../../hook/modal/useModal';
import MdButton from '../../../../mui/component/button/MdButton';
import MdCommonModal from '../../../../mui/component/modal/MdCommonModal';

export interface ICustomModaleProps {
  className?: string;
  button?: string;
  children: (props: { closeModal: () => void }) => React.JSX.Element;
}

const CustomModale: React.FC<ICustomModaleProps> = ({ className, button, children }) => {
  const { open, openModal, closeModal } = useModal();

  return (
    <>
      <MdCommonModal className={className} open={open} handleClose={closeModal}>
        {children({ closeModal })}
      </MdCommonModal>
      <MdButton label={button} onClick={openModal} />
    </>
  );
};

export default CustomModale;
