import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { JSONObject } from '../../dto/api/ApiDto';

export const useFormError = (name: string, errors: JSONObject, touched: JSONObject) => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const currentName = name;
    const error = errors[currentName as keyof JSONObject];
    if (error !== undefined && error !== '' && touched[currentName as keyof JSONObject]) {
      setError(error);
    } else {
      setError('');
    }
  }, [errors, touched, name]);

  const showError = useCallback(() => {
    return (
      <>
        {error && (
          <div style={{ margin: '0.5rem' }}>
            <Typography color='error'>{error}</Typography>
          </div>
        )}
      </>
    );
  }, [error]);

  return { error, showError };
};
