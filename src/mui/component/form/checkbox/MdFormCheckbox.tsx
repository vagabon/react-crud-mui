import { Checkbox, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { JSONObject } from '../../../../dto/api/ApiDto';
import { useFormError } from '../../../hook/useFormError';
import { HandleChangeType, IMdFormPropsReturnDto } from '../MdForm';

export interface IMdFormCheckboxProps extends IMdFormPropsReturnDto {
  label?: string;
  name: string;
}

const MdFormCheckbox: React.FC<IMdFormCheckboxProps> = (props: IMdFormCheckboxProps) => {
  const { t } = useTranslation();
  const { showError } = useFormError(props.name, props.errors, props.touched);

  const handleChange = useCallback(
    (callback: HandleChangeType) => () => {
      const checkked = props.values[props.name as keyof JSONObject] !== true;
      const newEvent = {
        target: {
          name: props.name,
          value: checkked,
        },
      };
      console.log(newEvent);
      callback(newEvent);
    },
    [props.name, props.values],
  );

  return (
    <div className='flex flex-row align-center'>
      <Typography paragraph={true} style={{ flex: '1', margin: '20px 7px' }}>
        {props.label && t(props.label)}
      </Typography>
      <Checkbox
        name={props.name}
        checked={props.values[props.name as keyof JSONObject] === true}
        onClick={handleChange(props.handleChange)}
        onBlur={props.handleBlur}
        inputProps={{ 'aria-label': 'controlled' }}
        style={{ padding: '0px 2px' }}
      />

      {showError()}
    </div>
  );
};

export default MdFormCheckbox;
