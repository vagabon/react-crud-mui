import { useCallback } from 'react';
import { IApiDto, JSONObject } from '../../../dto/api/ApiDto';
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
  const { error, showError } = useFormError(props.name, props.errors, props.touched);

  const handleKeyEnter = useCallback(
    (callback?: (values: IApiDto) => void) => (target: { name: string; value: string }) => {
      const state = {
        ...props.state,
        [target.name]: target.value,
      };
      !props.textarea && callback?.(state as IApiDto);
    },
    [props.state, props.textarea],
  );

  return (
    <div style={{ width: '100%' }} className={props.className}>
      <MdInputTextSimple
        error={error !== ''}
        type={props.type}
        label={props.label}
        name={props.name}
        value={props.state[props.name as keyof JSONObject]}
        required={props.validationSchema?.[props.name as keyof JSONObject]?.['required']}
        fullWidth={props.fullWidth}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        textarea={props.textarea}
        handleKeyEnter={handleKeyEnter(props.handleSubmit)}
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
