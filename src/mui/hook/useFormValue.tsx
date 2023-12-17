import { JSONValue } from 'dto/api/ApiDto';
import { useCallback, useEffect, useState } from 'react';
import { UuidUtils } from 'utils/uuid/UuidUtils';

export const useFormValue = (type: string, value: JSONValue) => {
  const [key, setKey] = useState<string>();
  const [defaultValue, setDefaultValue] = useState<JSONValue>();
  const [readonly, setReadonly] = useState(type === 'password');

  useEffect(() => {
    setKey(UuidUtils.createUUID());
    setDefaultValue(value);
  }, [value]);

  const handleFocus = useCallback(() => {
    type === 'password' && setTimeout(() => setReadonly(false), 100);
  }, [type]);

  return { key, defaultValue, readonly, handleFocus };
};
