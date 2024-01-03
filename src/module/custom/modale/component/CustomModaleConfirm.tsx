import { Trans } from 'react-i18next';
import { ID } from '../../../../dto/api/ApiDto';
import { useModal } from '../../../../hook/modal/useModal';
import MdButton from '../../../../mui/component/button/MdButton';
import MdCard from '../../../../mui/component/card/MdCard';
import MdCommonModal from '../../../../mui/component/modal/MdCommonModal';
import { ColorType } from '../../../../mui/hook/useIcon';
import CustomIcon from '../../icon/component/CustomIcon';

export interface ICustomModaleConfirmProps {
  id?: ID;
  label?: string;
  icon?: string;
  iconColor?: ColorType;
  button?: string;
  callback?: (id: ID) => void;
}

const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = ({ id, label, icon, iconColor, button, callback }) => {
  const { open, openModal, closeModal, handleYes } = useModal();

  return (
    <>
      <MdCommonModal className='modale-confirm' open={open} handleClose={closeModal}>
        <MdCard
          title='CONFIRMATION.TITLE'
          buttonchildren={
            <>
              <MdButton label='COMMON:NO' variant='text' onClick={closeModal} />
              <MdButton label='COMMON:YES' onClick={handleYes(id, callback)} />
            </>
          }>
          <Trans i18nKey={label ?? 'CONFIRMATION.MESSAGE'} />
        </MdCard>
      </MdCommonModal>
      {icon && <CustomIcon color={iconColor ?? 'error'} icon={icon} callback={openModal} />}
      {button && <MdButton label={button} color='error' onClick={openModal} />}
    </>
  );
};

export default CustomModaleConfirm;
