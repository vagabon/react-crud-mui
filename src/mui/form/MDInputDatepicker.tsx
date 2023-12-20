import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { JSONObject } from '../../dto/api/ApiDto';
import { useFormError } from '../hook/useFormError';
import { IMDFormPropsReturn, handleChangeType } from './MDForm';

export type FormInputType = 'date' | 'text' | 'number' | 'password' | 'email';

export interface IMDInputProps extends IMDFormPropsReturn {
  className?: string;
  label: string;
  name: string;
}

const MDInputDatepicker: React.FC<IMDInputProps> = (props: IMDInputProps) => {
  const { showError } = useFormError(props.name, props.errors, props.touched);
  const defaultValue = useRef(props.state[props.name as keyof JSONObject]);

  const [value, setValue] = useState<dayjs.Dayjs | string>(dayjs(defaultValue.current));

  useEffect(() => {
    const newValue = defaultValue.current;
    newValue && setValue(dayjs(newValue));
  }, [defaultValue]);

  const handleChange = useCallback(
    (callback: handleChangeType) => (newValue?: string | null) => {
      const newValueString = JSON.stringify(newValue).replaceAll('\\', '').replaceAll('"', '');
      callback({ target: { name: props.name, value: newValueString } });
    },
    [props.name],
  );

  return (
    <div style={{ width: '100%' }}>
      <DateTimePicker
        format='DD/MM/YYYY HH:mm:ss'
        ampm={false}
        className={props.className ?? ''}
        sx={{ width: '100%' }}
        label={props.label}
        name={props.name}
        onChange={handleChange(props.handleChange)}
        value={value as string}
        disabled={props.disabled ?? false}
      />
      {showError()}
    </div>
  );
};

export default MDInputDatepicker;
