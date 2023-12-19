import { Box } from '@mui/material';
import { JSONObject } from '../../dto/api/ApiDto';
import { useFormError } from '../../mui/hook/useFormError';
import { IMDFormPropsReturn } from './MDForm';
import MDInputTextSimple from './MDInputTextSimple';

export type FormInputType = 'date' | 'text' | 'number' | 'password' | 'email';

export interface IMDInputProps extends IMDFormPropsReturn {
  label: string;
  name: string;
  type?: 'date' | 'text' | 'number' | 'password' | 'email';
  textarea?: number;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const MDInputText: React.FC<IMDInputProps> = (props: IMDInputProps) => {
  const { error } = useFormError(props.name, props.errors, props.touched);

  return (
    <div style={{ width: '100%' }}>
      <MDInputTextSimple
        className={props.className}
        type={props.type}
        label={props.label}
        name={props.name}
        value={props.state[props.name as keyof JSONObject]}
        required={
          props.validationSchema[props.name as keyof JSONObject] &&
          props.validationSchema[props.name as keyof JSONObject]['required']
        }
        fullWidth={props.fullWidth}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        textarea={props.textarea}></MDInputTextSimple>

      {error && (
        <div className='form-group'>
          <Box className='alert' role='alert'>
            {error}
          </Box>
        </div>
      )}
    </div>
  );
};

MDInputText.defaultProps = {
  type: 'text',
  textarea: 0,
  required: false,
  fullWidth: true,
  className: '',
};

export default MDInputText;
