import { ID } from '../../../../dto/api/ApiDto';
import { useModal } from '../../../../hook/modal/useModal';
import MdButton, { ButtonColorType } from '../../../../mui/component/button/MdButton';
import MdCommonModal from '../../../../mui/component/modal/MdCommonModal';
import { IconColorType } from '../../../../mui/hook/useIcon';
import CustomIcon from '../../icon/component/CustomIcon';

export interface ICustomModaleChildProps {
  className?: string;
  icon?: string;
  iconColor?: IconColorType;
  button?: string;
  buttonColor?: ButtonColorType;
}

export type ICustomModalChildrenType = (props: {
  closeModal?: () => void;
  handleYes?: (id: ID, callback?: (id: ID) => void) => () => void;
}) => React.JSX.Element;

export interface ICustomModaleProps extends ICustomModaleChildProps {
  children: ICustomModalChildrenType;
}

const CustomModale: React.FC<ICustomModaleProps> = ({ className, icon, iconColor, button, buttonColor, children }) => {
  const { open, openModal, closeModal, handleYes } = useModal();

  return (
    <>
      <MdCommonModal className={className} open={open} handleClose={closeModal}>
        {children({ closeModal, handleYes })}
      </MdCommonModal>
      {icon && <CustomIcon color={iconColor} icon={icon} callback={openModal} />}
      {button && <MdButton label={button} color={buttonColor} onClick={openModal} />}
    </>
  );
};

export default CustomModale;
