import { useCallback } from 'react';
import { ApiService } from '../../../../api/service/ApiService';
import { ID } from '../../../../dto/api/ApiDto';
import { HandleChangeType } from '../../../../mui/component/form/MdForm';

export const useCustomFormUpload = (endPoint: string) => {
  const uploadImage = useCallback(
    (id: ID, file: File | undefined): Promise<string> => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      return ApiService.post('/' + endPoint + '/upload?id=' + id, formData, {
        'Content-Type': 'multipart/form-data',
      });
    },
    [endPoint],
  );

  const handleChangeFile = useCallback(
    (id: ID, callback: HandleChangeType) => (name: string, file: File) => {
      uploadImage(id, file).then((data) => {
        const event = { target: { name, value: data } };
        console.log('FILE UPLOAD : ', data, event);
        callback(event);
      });
    },
    [uploadImage],
  );

  return { handleChangeFile };
};
