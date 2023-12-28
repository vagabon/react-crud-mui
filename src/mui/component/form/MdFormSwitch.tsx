import { Switch, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { JSONObject } from '../../../dto/api/ApiDto';
import { useFormError } from '../../hook/useFormError';
import { HandleChangeType, IMdFormPropsReturnDto } from './MdForm';

export interface IMdFormSwitchProps extends IMdFormPropsReturnDto {
  className?: string;
  label: string;
  name: string;
}

const MdFormSwitch: React.FC<IMdFormSwitchProps> = (props: IMdFormSwitchProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const { showError } = useFormError(props.name, props.errors, props.touched);

  useEffect(() => {
    setChecked(props.values[props.name as keyof JSONObject] === true);
  }, [props.name, props.values]);

  const handleChange = useCallback(
    (oldValue: boolean, callback: HandleChangeType) => () => {
      const newEvent = { target: { name: props.name, value: !oldValue } };
      callback(newEvent);
    },
    [props.name],
  );

  return (
    <div className={'flex switch ' + props.className}>
      <div>
        <Typography paragraph={true}>
          <Trans i18nKey={props.label} />
          {props.validationSchema?.[props.name as keyof JSONObject]?.required ? ' *' : ''}
        </Typography>
        <Switch
          color='secondary'
          checked={checked}
          onChange={handleChange(checked, props.handleChange)}
          onBlur={props.handleBlur}
        />
      </div>
      {showError()}
    </div>
  );
};

export default MdFormSwitch;
