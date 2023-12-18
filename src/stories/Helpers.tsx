import { withTests } from '@storybook/addon-jest';
import React, { cloneElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IApiDto, JSONObject } from '../dto/api/ApiDto';
import MDForm, { IMDFormPropsReturn } from '../mui/form/MDForm';
import store from '../store/Store';
import { IYupValidators } from '../utils/yup/YupUtils';

import results from '../jest-test-results.json';

export const withProvider = (Story: React.FC) => (
  <Provider store={store}>
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  </Provider>
);

interface IRadioWithFormProps {
  initialValues: JSONObject;
  validationSchema: IYupValidators;
  onSubmit: () => void;
  children: JSX.Element;
}

export const FormWrapper = (props: IRadioWithFormProps) => {
  return (
    <MDForm initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={props.onSubmit}>
      {(formikProps: IMDFormPropsReturn) => <>{cloneElement(props.children, formikProps)}</>}
    </MDForm>
  );
};

interface IOptions extends IApiDto {
  label: string;
}
export const optionsYesNo: IOptions[] = [
  { id: 'OUI', label: 'OUI' },
  { id: 'NON', label: 'NON' },
];

export const withTest = withTests({ results });
