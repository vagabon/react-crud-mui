import { FormHelperText } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { JSONObject } from '../../dto/api/ApiDto';
import { useMessage } from '../../hook/message/useMessage';

export const useFormError = (name: string, errors: JSONObject, touched: JSONObject) => {
  const [error, setError] = useState<string>('');
  const { message } = useMessage();

  useEffect(() => {
    const currentName = name;
    const error = errors[currentName as keyof JSONObject];
    if (error !== undefined && error !== '' && (touched[currentName as keyof JSONObject] || message !== '')) {
      setError(error);
    } else {
      setError('');
    }
  }, [errors, touched, name, message]);

  const showError = useCallback(() => {
    return (
      <>
        {error && (
          <FormHelperText style={{ margin: '0.5rem' }} error={true}>
            {error}
          </FormHelperText>
        )}
      </>
    );
  }, [error]);

  return { error, showError };
};
