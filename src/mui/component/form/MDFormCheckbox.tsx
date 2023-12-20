import { Checkbox, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JSONObject } from '../../../dto/api/ApiDto';
import { IMDFormPropsReturn } from './MDForm';

export interface IFormCheckboxProps extends IMDFormPropsReturn {
  label?: string;
  name: string;
}

const MDFormCheckbox: React.FC<IFormCheckboxProps> = (props: IFormCheckboxProps) => {
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const nameOnLoad = props.name;

  useEffect(() => {
    const error = props.errors[nameOnLoad as keyof JSONObject];
    if (error !== undefined && error !== '' && props.touched[nameOnLoad as keyof JSONObject]) {
      setError(error);
    } else {
      setError('');
    }
  }, [props.errors, props.touched, nameOnLoad]);

  const handleChange = () => {
    const checkked = props.values[nameOnLoad as keyof JSONObject] !== true;
    const newEvent = {
      target: {
        name: props.name,
        value: checkked,
      },
    };
    props.handleChange(newEvent);
  };

  return (
    <div className='flex '>
      <Typography paragraph={true}>{props.label && t(props.label)}</Typography>
      <Checkbox
        name={props.name}
        checked={props.values[nameOnLoad as keyof JSONObject] === true}
        onChange={handleChange}
        onBlur={props.handleBlur}
        inputProps={{ 'aria-label': 'controlled' }}
      />

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

export default MDFormCheckbox;
