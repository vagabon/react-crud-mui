import { Trans } from 'react-i18next';
import { IApiDto, JSONObject } from '../../../../dto/api/ApiDto';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import CustomModale from './CustomModale';

export interface ICustomModaleReturnDto extends IMdFormPropsReturnDto {
  closeModal: () => void;
}

export interface ICustomModaleFormProps {
  title: string;
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  button?: string;
  small?: boolean;
  onSubmit?: (callback: () => void) => (values: IApiDto) => void;
  children: (props: ICustomModaleReturnDto) => React.JSX.Element;
}

const CustomModaleForm: React.FC<ICustomModaleFormProps> = ({ title, button, onSubmit, ...rest }) => {
  return (
    <CustomModale className={'form-modale' + (rest.small ? '-small ' : ' ')} button={button}>
      {({ closeModal }) => (
        <>
          <h1>
            <Trans i18nKey={title} />
          </h1>
          <MdForm
            className='flex justify-center'
            initialValues={rest.initialValues}
            validationSchema={rest.validationSchema}
            onSubmit={onSubmit?.(closeModal)}
            onGoBack={closeModal}>
            {(props) => <>{rest.children({ ...props, closeModal: closeModal })}</>}
          </MdForm>
        </>
      )}
    </CustomModale>
  );
};

export default CustomModaleForm;
