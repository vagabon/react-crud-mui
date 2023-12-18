import { useEffect, useState } from 'react';
import { UuidUtils } from '../../utils/uuid/UuidUtils';

export const useId = (newId?: string) => {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    setId(newId ?? UuidUtils.createUUID());
  }, [newId]);

  return { id };
};
