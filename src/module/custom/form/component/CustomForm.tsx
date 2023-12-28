import { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IApiDto } from '../../../../dto/api/ApiDto';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import MdFormSwitch from '../../../../mui/component/form/MdFormSwitch';
import MdInputDatepicker, { FormInputType } from '../../../../mui/component/form/MdInputDatepicker';
import MdInputText from '../../../../mui/component/form/MdInputText';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { IFormDto } from '../../../admin/dto/AdminConfDto';
import { useCustomFormUpload } from '../hook/useCustomFormUpload';
import CustomFormManyToMany from './CustomFormManyToMany';
import CustomFormSelect from './CustomFormSelect';

export interface ICustomFormProps {
  endPoint: string;
  conf: [string, IFormDto][];
  values: IApiDto;
  schema: IYupValidators;
  urlGoBack?: string;
  handleUpdate: (data: IApiDto) => void;
}

const CustomForm: React.FC<ICustomFormProps> = ({ endPoint, conf, values, schema, urlGoBack, handleUpdate }) => {
  const navigate = useNavigate();
  const { handleChangeFile } = useCustomFormUpload(endPoint);

  const handleGoBack = useCallback(() => {
    urlGoBack && navigate(urlGoBack);
  }, [navigate, urlGoBack]);

  return (
    <MdForm
      className='flex-row flex-wrap form'
      initialValues={values}
      validationSchema={schema}
      onSubmit={handleUpdate}
      onGoBack={urlGoBack ? handleGoBack : undefined}>
      {(props: IMdFormPropsReturnDto) => (
        <>
          {conf?.map(([key, form]: [string, IFormDto]) => (
            <Fragment key={key}>
              {(form.type === 'text' ||
                form.type === 'textarea' ||
                form.type === 'date' ||
                form.type === 'password') && (
                <MdInputText
                  label={form.label}
                  className={form.className ?? 'width100'}
                  name={key}
                  textarea={form.type === 'textarea' ? 10 : undefined}
                  {...props}
                  type={form.type as FormInputType}
                />
              )}
              {form.type === 'datetime' && (
                <MdInputDatepicker
                  label={form.label}
                  className={form.className}
                  name={key}
                  {...props}
                  disabled={form.disabled}
                />
              )}
              {form.type === 'upload' && (
                <MdFormFile
                  label={form.label}
                  name={key}
                  values={props.values}
                  handleChangeFile={handleChangeFile(values.id, props.handleChange)}
                />
              )}
              {form.type === 'select' && (
                <CustomFormSelect conf={form} label={form.label} name={key} listId={true} {...props} />
              )}
              {form.type === 'm2m' && <CustomFormManyToMany conf={form} label={form.label} name={key} {...props} />}
              {form.type === 'switch' && (
                <MdFormSwitch className={form.className} label={form.label} name={key} {...props} />
              )}
            </Fragment>
          ))}
        </>
      )}
    </MdForm>
  );
};

export default CustomForm;
