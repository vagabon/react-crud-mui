import { v4 as uuidv4 } from 'uuid';

export const UuidUtils = {
  createUUID: (): string => {
    return uuidv4();
  },
};
