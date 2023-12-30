import { useCallback, useState } from 'react';
import { Trans } from 'react-i18next';
import { ID } from '../../../../dto/api/ApiDto';
import MdButton from '../../../../mui/component/button/MdButton';
import MdCard from '../../../../mui/component/card/MdCard';
import MdCommonModal from '../../../../mui/component/modal/MdCommonModal';
import CustomIcon from '../../icon/component/CustomIcon';

export interface ICustomModaleConfirmProps {
  id?: ID;
  label?: string;
  icon?: string;
  callback: (id: ID) => void;
}

const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = ({ id, label, icon, callback }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    [],
  );

  const handleYes = useCallback(() => {
    setOpen(false);
    callback(id);
  }, [id, callback]);

  return (
    <>
      <MdCommonModal className='modale-confirm' open={open} handleClose={handleOpen(false)}>
        <MdCard
          title='CONFIRMATION.TITLE'
          buttonchildren={
            <>
              <MdButton label='COMMON:NO' variant='text' onClick={handleOpen(false)} />
              <MdButton label='COMMON:YES' onClick={handleYes} />
            </>
          }>
          <Trans i18nKey={label ?? 'CONFIRMATIOn.MESSAGE'} />
        </MdCard>
      </MdCommonModal>
      {icon && <CustomIcon color='error' icon={icon} callback={handleOpen(true)} />}
    </>
  );
};

export default CustomModaleConfirm;
