import { InputProps, TextField, TextFieldVariants } from '@mui/material';
import { KeyboardEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IApiDto, JSONValue } from '../../../dto/api/ApiDto';
import { ObjectUtils } from '../../../utils/object/ObjectUtils';
import { useFormValue } from '../../hook/useFormValue';
import { HandleBlurType, HandleChangeType } from './MdForm';

const DEFAULT_TEXT = 'text';

export interface IMdInputTextSimpleProps {
  label: string;
  value: JSONValue;
  name: string;
  variant?: TextFieldVariants;
  placeholder?: string;
  size?: 'small' | 'medium';
  type?: 'date' | 'text' | 'number' | 'password' | 'email';
  textarea?: number;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  error?: boolean;
  inputProps?: Partial<InputProps>;
  handleChange?: HandleChangeType;
  handleBlur?: HandleBlurType;
  handleKeyEnter?: (target: { name: string; value: string }) => void;
}

const MdInputTextSimple: React.FC<IMdInputTextSimpleProps> = (props: IMdInputTextSimpleProps) => {
  const { t } = useTranslation();
  const { uref, key, defaultValue, readonly, handleFocus, handleBlur } = useFormValue(
    props.type ?? DEFAULT_TEXT,
    props.value,
  );

  const handleKeyUp = useCallback(
    (callbackEnter?: (target: { name: string; value: string }) => void) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        const target = {
          name: ObjectUtils.getDtoString(event.target as IApiDto, 'name'),
          value: ObjectUtils.getDtoString(event.target as IApiDto, 'value'),
        };
        callbackEnter?.(target);
      }
    },
    [],
  );

  return (
    <div style={{ width: '100%' }}>
      <TextField
        error={props.error}
        key={key}
        inputRef={uref}
        className={props.className}
        type={props.type}
        margin='normal'
        label={t(props.label)}
        variant={props.variant}
        placeholder={props.placeholder}
        size={props.size}
        name={props.name}
        defaultValue={defaultValue}
        required={props.required}
        fullWidth={props.fullWidth}
        onFocus={handleFocus}
        onChange={props.handleChange}
        onBlur={handleBlur(props.handleBlur)}
        onKeyUp={handleKeyUp(props.handleKeyEnter)}
        InputProps={{
          ...props.inputProps,
          autoComplete: 'off',
          readOnly: readonly,
        }}
        multiline={(props.textarea ?? 0) > 0}
        rows={props.textarea}></TextField>
    </div>
  );
};

MdInputTextSimple.defaultProps = {
  type: DEFAULT_TEXT,
  textarea: 0,
  required: false,
  fullWidth: true,
  className: '',
};

export default MdInputTextSimple;
