import { TextField } from '@mui/material';
import { JSONObject } from 'dto/api/ApiDto';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UuidUtils } from 'utils/uuid/UuidUtils';
import { IMDFormPropsReturn } from './MDForm';

export interface IMDInputProps extends IMDFormPropsReturn {
  label: string;
  name: string;
  type?: 'date' | 'text' | 'number' | 'password' | 'email';
  textarea?: boolean;
  required?: boolean;
  className?: string;
}

const MDInputText: React.FC<IMDInputProps> = (props: IMDInputProps) => {
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();
  const [key, setKey] = useState<string>();
  const [defaultValue, setDefaultValue] = useState<string>();
  const [readonly, setReadonly] = useState(props.type === 'password');

  const nameOnLoad = useRef(props.name);

  useEffect(() => {
    const currentName = nameOnLoad.current;
    const error = props.errors[currentName as keyof JSONObject];
    if (error !== undefined && error !== '' && props.touched[currentName as keyof JSONObject]) {
      setError(error);
    } else {
      setError('');
    }
  }, [props.errors, props.touched, nameOnLoad]);

  useEffect(() => {
    const newValue = props.state[nameOnLoad.current as keyof JSONObject];
    setKey(UuidUtils.createUUID());
    setDefaultValue(newValue);
  }, [props.state]);

  const handleFocus = useCallback(() => {
    props.type === 'password' && setTimeout(() => setReadonly(false), 100);
  }, [props.type]);

  return (
    <div style={{ width: '100%' }}>
      <TextField
        key={key}
        className={props.className}
        type={props.type}
        margin='normal'
        label={t(props.label)}
        name={props.name}
        defaultValue={defaultValue}
        required={
          props.validationSchema[nameOnLoad.current as keyof JSONObject] &&
          props.validationSchema[nameOnLoad.current as keyof JSONObject]['required']
        }
        fullWidth
        onFocus={handleFocus}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        inputProps={{
          autoComplete: 'off',
          form: {
            autoComplete: 'off',
          },
          readOnly: readonly,
        }}
        multiline={props.textarea}
        rows={10}></TextField>

      {error && (
        <div className='form-group'>
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

MDInputText.defaultProps = {
  type: 'text',
  textarea: false,
  required: false,
  className: '',
};

export default MDInputText;
