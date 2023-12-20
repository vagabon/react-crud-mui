import { JSONObject } from '../../../dto/api/ApiDto';
import { useFormError } from '../../hook/useFormError';
import { IMdFormPropsReturnDto } from './MdForm';
import MdInputTextSimple from './MdInputTextSimple';

export type FormInputType = 'date' | 'text' | 'number' | 'password' | 'email';

export interface IMdInputTextProps extends IMdFormPropsReturnDto {
  label: string;
  name: string;
  type?: 'date' | 'text' | 'number' | 'password' | 'email';
  textarea?: number;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const MdInputText: React.FC<IMdInputTextProps> = (props: IMdInputTextProps) => {
  const { showError } = useFormError(props.name, props.errors, props.touched);

  return (
    <div style={{ width: '100%' }}>
      <MdInputTextSimple
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
        textarea={props.textarea}
      />
      {showError()}
    </div>
  );
};

MdInputText.defaultProps = {
  type: 'text',
  textarea: 0,
  required: false,
  fullWidth: true,
  className: '',
};

export default MdInputText;
