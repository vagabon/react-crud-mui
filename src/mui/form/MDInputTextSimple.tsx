import { TextField, TextFieldVariants } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { JSONValue } from '../../dto/api/ApiDto';
import { useFormValue } from '../../mui/hook/useFormValue';
import { handleBlurType, handleChangeType } from './MDForm';

const DEFAULT_TEXT = 'text';

export interface IMDInputTextSimpleProps {
  label: string;
  value: JSONValue;
  variant?: TextFieldVariants;
  placeholder?: string;
  name: string;
  size?: 'small' | 'medium';
  type?: 'date' | 'text' | 'number' | 'password' | 'email';
  textarea?: number;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  handleChange?: handleChangeType;
  handleBlur?: handleBlurType;
}

const MDInputTextSimple: React.FC<IMDInputTextSimpleProps> = (props: IMDInputTextSimpleProps) => {
  const { t } = useTranslation();
  const { key, defaultValue, readonly, handleFocus } = useFormValue(props.type ?? DEFAULT_TEXT, props.value);

  return (
    <div style={{ width: '100%' }}>
      <TextField
        key={key}
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
        onBlur={props.handleBlur}
        inputProps={{
          autoComplete: 'off',
          form: {
            autoComplete: 'off',
          },
          readOnly: readonly,
        }}
        multiline={(props.textarea ?? 0) > 0}
        rows={props.textarea}></TextField>
    </div>
  );
};

MDInputTextSimple.defaultProps = {
  type: DEFAULT_TEXT,
  textarea: 0,
  required: false,
  fullWidth: true,
  className: '',
};

export default MDInputTextSimple;
