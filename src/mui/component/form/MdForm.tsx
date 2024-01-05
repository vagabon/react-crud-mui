import { Formik, FormikErrors } from 'formik';
import { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IApiDto, JSONObject, JSONValue } from '../../../dto/api/ApiDto';
import { IPathDto } from '../../../dto/path/PathDto';
import { CommonAction } from '../../../reducer/common/CommonReducer';
import { useAppDispatch, useAppSelector } from '../../../store/Store';
import { IYupValidators, YupUtils } from '../../../utils/yup/YupUtils';
import MdButton from '../button/MdButton';

export type HandleChangeType = {
  (e: ChangeEvent<JSONObject>): void;
  <T = string | ChangeEvent<JSONObject>>(field: T): T extends ChangeEvent<JSONObject>
    ? void
    : (e: string | ChangeEvent<JSONObject>) => void;
};

export type HandleBlurType = {
  (e: FocusEvent<JSONObject, Element>): void;
  <T = JSONObject>(fieldOrEvent: T): T extends string ? (e: JSONObject) => void : void;
};

export type SetFieldValueType = (
  field: string,
  value: JSONObject,
  shouldValidate?: boolean | undefined,
) => Promise<void | FormikErrors<IApiDto>>;

export type ValidateFormType = (values?: JSONObject) => Promise<FormikErrors<JSONValue>>;

export interface IMdFormPropsReturnDto {
  values: JSONObject;
  state: JSONObject;
  errors: JSONObject;
  touched: JSONObject;
  validationSchema: IYupValidators;
  handleChange: HandleChangeType;
  handleBlur: HandleBlurType;
  handleSubmit: (values: IApiDto) => void;
  validateForm: ValidateFormType;
  setFieldValue: SetFieldValueType;
  setValues: (values: IApiDto, shouldValidate?: boolean) => Promise<void | FormikErrors<IApiDto>>;
  disabled?: boolean;
}

export interface IMdFormProps {
  className?: string;
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  onSubmit?: (values: IApiDto) => void;
  onGoBack?: () => void;
  children: (props: IMdFormPropsReturnDto) => React.JSX.Element;
  backButton?: boolean;
  submitButton?: boolean;
}

const MdForm: React.FC<IMdFormProps> = (props: IMdFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { history } = useAppSelector((state) => state.common);
  const { t } = useTranslation();

  const [state, setState] = useState<JSONObject>(props.initialValues);

  useEffect(() => {
    setState(props.initialValues);
  }, [props.initialValues]);

  const doSubmit = useCallback(
    (values: IApiDto, validateForm: (values?: IApiDto) => Promise<FormikErrors<IApiDto>>): void => {
      dispatch(CommonAction.setMessage({ message: '', type: 'success' }));
      console.log(values);
      validateForm(values).then((errors: FormikErrors<IApiDto>) => {
        console.log('form errors', values, errors);
        if (Object.keys(errors).length > 0) {
          dispatch(CommonAction.setMessage({ message: 'COMMON:FORM.ERROR', type: 'error' }));
        } else {
          dispatch(CommonAction.clearMessage());
          props.onSubmit?.(values);
        }
      });
    },
    [props, dispatch],
  );

  const onSubmit = useCallback(
    (values: IApiDto): void => {
      props.onSubmit?.(values);
    },
    [props],
  );

  const goBack = useCallback((): void => {
    if (props.onGoBack) {
      props.onGoBack();
    } else {
      const lastPage: IPathDto = history[history.length - 2];
      dispatch(CommonAction.sliceHistory());
      navigate(lastPage.link);
    }
  }, [dispatch, history, navigate, props]);

  return (
    <Formik
      initialValues={state}
      validationSchema={YupUtils.convertToYup(props.validationSchema, t)}
      onSubmit={onSubmit}
      autoComplete='off'
      enableReinitialize>
      {({ values, errors, touched, handleChange, handleBlur, validateForm, setFieldValue, setValues }) => (
        <>
          <div className={'form-content ' + props.className}>
            {props.children({
              values,
              state,
              errors,
              touched,
              validationSchema: props.validationSchema,
              handleChange,
              handleBlur,
              handleSubmit: (values: IApiDto) => doSubmit(values, validateForm),
              validateForm,
              setFieldValue,
              setValues,
            })}
          </div>
          {(props.backButton || props.submitButton) && (
            <>
              <div style={{ height: '30px' }}>&nbsp;</div>
              <div className='width100 flex-row justify-end'>
                {props.backButton && history.length > 1 && <MdButton label='Retour' variant='text' onClick={goBack} />}
                {props.submitButton && props.onSubmit && (
                  <MdButton label='COMMON:SUBMIT' onClick={() => doSubmit(values, validateForm)} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

MdForm.defaultProps = {
  backButton: true,
  submitButton: true,
};

export default MdForm;
