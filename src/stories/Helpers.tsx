import { withTests } from '@storybook/addon-jest';
import { cloneElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { IApiDto, JSONObject } from '../dto/api/ApiDto';
import MdForm, { IMdFormPropsReturnDto } from '../mui/component/form/MdForm';
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
  children: React.JSX.Element;
}

export const FormWrapper = (props: IRadioWithFormProps) => {
  return (
    <MdForm initialValues={props.initialValues} validationSchema={props.validationSchema} onSubmit={props.onSubmit}>
      {(formikProps: IMdFormPropsReturnDto) => <>{cloneElement(props.children, formikProps)}</>}
    </MdForm>
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
