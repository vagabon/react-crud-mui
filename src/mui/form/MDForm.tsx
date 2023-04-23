import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react';
import { Formik, Form, FormikErrors } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import MdButton from '../button/MdButton';
import { useTranslation } from 'react-i18next';
import { IApiDto, JSONObject } from 'dto/api/ApiDto';
import { IPathDto } from 'dto/path/PathDto';
import { IYupValidators, YupUtils } from 'utils/yup/YupUtils';
import { CommonAction } from 'reducer/common/CommonReducers';

export interface IMDFormPropsReturn {
  values: JSONObject;
  errors: JSONObject;
  touched: JSONObject;
  validationSchema: JSONObject;
  handleChange: {
    (e: ChangeEvent<JSONObject>): void;
    <T = string | ChangeEvent<JSONObject>>(field: T): T extends ChangeEvent<JSONObject>
      ? void
      : (e: string | ChangeEvent<JSONObject>) => void;
  };
  handleBlur: {
    (e: FocusEvent<JSONObject, Element>): void;
    <T = JSONObject>(fieldOrEvent: T): T extends string ? (e: JSONObject) => void : void;
  };
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setValues: (values: IApiDto, shouldValidate?: boolean) => void;
}

export interface IMDFormProps {
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  onSubmit: (values: IApiDto) => void;
  onGoBack?: () => void;
  children: (props: IMDFormPropsReturn) => JSX.Element;
  backButton?: boolean;
  submitButton?: boolean;
}

const MDForm: React.FC<IMDFormProps> = (props: IMDFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { history } = useAppSelector((state) => state.common);
  const { t } = useTranslation();
  const [onGoBackOnLoad] = useState(() => props.onGoBack);

  const [state, setState] = useState<JSONObject>(props.initialValues);

  useEffect(() => {
    setState(props.initialValues);
  }, [props.initialValues]);

  const doSubmit = useCallback(
    (values: IApiDto, validateForm: (values?: IApiDto) => Promise<FormikErrors<IApiDto>>): void => {
      dispatch(CommonAction.setMessage({ message: '', type: 'success' }));
      validateForm().then((errors) => {
        console.log('form errors : ', errors);
        if (Object.keys(errors).length > 0) {
          dispatch(CommonAction.setMessage({ message: 'COMMON:FORM.ERROR', type: 'success' }));
        } else {
          dispatch(CommonAction.clearMessage());
          props.onSubmit(values);
        }
      });
    },
    [props, dispatch],
  );

  const onSubmit = useCallback(
    (values: IApiDto): void => {
      props.onSubmit(values);
    },
    [props],
  );

  const goBack = useCallback((): void => {
    if (onGoBackOnLoad) {
      onGoBackOnLoad();
    } else {
      const lastPage: IPathDto = history[history.length - 2];
      dispatch(CommonAction.sliceHistory());
      navigate(lastPage.link);
    }
  }, [dispatch, history, navigate, onGoBackOnLoad]);

  return (
    <Formik
      initialValues={state}
      validationSchema={YupUtils.convertToYup(props.validationSchema, t)}
      onSubmit={onSubmit}
      autoComplete='none'
      enableReinitialize>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, validateForm, setFieldValue, setValues }) => (
        <Form autoComplete='off'>
          {props.children({
            values,
            errors,
            touched,
            validationSchema: props.validationSchema,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setValues,
          })}
          <div style={{ height: '20px' }}>&nbsp;</div>
          <div className='flexRow justify-end'>
            {props.backButton === true && history.length > 1 && <MdButton label='Retour' variant='text' onClick={goBack} />}
            {props.submitButton === true && <MdButton label='COMMON:SUBMIT' onClick={() => doSubmit(values, validateForm)} />}
          </div>
        </Form>
      )}
    </Formik>
  );
};

MDForm.defaultProps = {
  backButton: true,
  submitButton: true,
};

export default MDForm;
