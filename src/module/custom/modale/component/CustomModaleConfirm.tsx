import { Trans } from 'react-i18next';
import { ID } from '../../../../dto/api/ApiDto';
import MdButton from '../../../../mui/component/button/MdButton';
import MdCard from '../../../../mui/component/card/MdCard';
import CustomModale, { ICustomModaleChildProps } from './CustomModale';

export interface ICustomModaleConfirmProps extends ICustomModaleChildProps {
  id?: ID;
  label?: string;
  callback?: (id: ID) => void;
}

const CustomModaleConfirm: React.FC<ICustomModaleConfirmProps> = ({ id, label, callback, ...rest }) => {
  return (
    <CustomModale {...rest} className='modal-confirm'>
      {({ closeModal, handleYes }) => (
        <MdCard
          title='CONFIRMATION.TITLE'
          buttonchildren={
            <>
              <MdButton label='COMMON:NO' variant='text' onClick={closeModal} />
              <MdButton label='COMMON:YES' onClick={handleYes?.(id, callback)} />
            </>
          }>
          <Trans i18nKey={label ?? 'CONFIRMATION.MESSAGE'} />
        </MdCard>
      )}
    </CustomModale>
  );
};

export default CustomModaleConfirm;
