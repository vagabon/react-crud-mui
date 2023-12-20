import { FocusEvent, useCallback, useEffect, useRef, useState } from 'react';
import { JSONObject, JSONValue } from '../../dto/api/ApiDto';
import { UuidUtils } from '../../utils/uuid/UuidUtils';
import { handleBlurType } from '../component/form/MDForm';

export const useFormValue = (type: string, value: JSONValue) => {
  const [key, setKey] = useState<string>();
  const [defaultValue, setDefaultValue] = useState<JSONValue>();
  const [readonly, setReadonly] = useState(type === 'password');
  const uref = useRef<HTMLInputElement>();
  const isFocusRef = useRef<boolean>(false);

  useEffect(() => {
    setKey(UuidUtils.createUUID());
    setDefaultValue(value);
    if (isFocusRef.current === true) {
      setTimeout(() => {
        uref?.current?.focus();
      }, 100);
    }
  }, [value]);

  const handleFocus = useCallback(() => {
    isFocusRef.current = true;
    type === 'password' && setTimeout(() => setReadonly(false), 100);
  }, [type]);

  const handleBlur = useCallback(
    (callback?: handleBlurType) => (event: FocusEvent<JSONObject, Element>) => {
      isFocusRef.current = false;
      callback?.(event);
    },
    [],
  );

  return { uref, key, defaultValue, readonly, handleFocus, handleBlur };
};
