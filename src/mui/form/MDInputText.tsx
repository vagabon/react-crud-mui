import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMDFormPropsReturn } from './MDForm';
import { JSONObject } from 'dto/api/ApiDto';

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

  const [nameOnLoad] = useState(props.name);

  useEffect(() => {
    const error = props.errors[nameOnLoad as keyof JSONObject];
    if (error !== undefined && error !== '' && props.touched[nameOnLoad as keyof JSONObject]) {
      setError(error);
    } else {
      setError('');
    }
  }, [props.errors, props.touched, nameOnLoad]);

  return (
    <>
      <div style={{ width: '100%' }}>
        <TextField
          className={props.className}
          type={props.type}
          margin='normal'
          required={
            props.validationSchema[nameOnLoad as keyof JSONObject] && props.validationSchema[nameOnLoad as keyof JSONObject]['required']
          }
          fullWidth
          label={t(props.label)}
          id={props.name}
          name={props.name}
          value={props.values[nameOnLoad as keyof JSONObject] || ''}
          onChange={props.handleChange}
          onBlur={props.handleBlur}></TextField>

        {error && (
          <div className='form-group'>
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

MDInputText.defaultProps = {
  type: 'text',
  textarea: false,
  required: false,
  className: '',
};

export default MDInputText;
