import { IApiDto, JSONObject } from '../../../../dto/api/ApiDto';
import MdForm from '../../../../mui/component/form/MdForm';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { ICustomModalChildrenType, ICustomModaleChildProps } from './CustomModale';
import CustomModaleCard from './CustomModaleCard';

export interface ICustomModaleFormProps extends ICustomModaleChildProps {
  title: string;
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  small?: boolean;
  onSubmit?: (callback?: () => void) => (values: IApiDto) => void;
  children: ICustomModalChildrenType;
}

const CustomModaleForm: React.FC<ICustomModaleFormProps> = ({
  title,
  initialValues,
  validationSchema,
  small,
  onSubmit,
  children,
  ...rest
}) => {
  return (
    <CustomModaleCard {...rest} title={title} className={'form-modale' + (small ? '-small ' : ' ')}>
      {({ closeModal }) => (
        <MdForm
          className='flex justify-center'
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit?.(closeModal)}
          onGoBack={closeModal}>
          {(props) => <>{children({ ...props, closeModal: closeModal })}</>}
        </MdForm>
      )}
    </CustomModaleCard>
  );
};

export default CustomModaleForm;
