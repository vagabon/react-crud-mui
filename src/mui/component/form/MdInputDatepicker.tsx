import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JSONObject } from '../../../dto/api/ApiDto';
import { useFormError } from '../../hook/useFormError';
import { HandleChangeType, IMdFormPropsReturnDto } from './MdForm';

export type FormInputType = 'date' | 'text' | 'number' | 'password' | 'email';

export interface IMdInputDatepickerProps extends IMdFormPropsReturnDto {
  className?: string;
  label: string;
  name: string;
}

const MdInputDatepicker: React.FC<IMdInputDatepickerProps> = (props: IMdInputDatepickerProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<dayjs.Dayjs | string | undefined>();
  const { error } = useFormError(props.name, props.errors, props.touched);

  useEffect(() => {
    const newValue = props.state[props.name as keyof JSONObject];
    newValue && setValue(dayjs(newValue));
  }, [props.state, props.name]);

  const handleChange = useCallback(
    (callback: HandleChangeType) => (newValue?: string | null) => {
      let newValueString: string = '';
      if (newValue) {
        newValueString = JSON.stringify(newValue).replaceAll('\\', '').replaceAll('"', '');
      }
      callback({ target: { name: props.name, value: newValueString } });
    },
    [props.name],
  );

  return (
    <div style={{ width: '100%' }} className={props.className ?? ''}>
      <DateTimePicker
        slotProps={{
          textField: {
            variant: 'outlined',
            error: error !== '',
          },
          field: { clearable: true },
        }}
        format='DD/MM/YYYY HH:mm:ss'
        ampm={false}
        sx={{ width: '100%' }}
        label={t(props.label)}
        name={props.name}
        onChange={handleChange(props.handleChange)}
        value={(value as string) ?? ''}
        disabled={props.disabled ?? false}
      />
    </div>
  );
};

export default MdInputDatepicker;
