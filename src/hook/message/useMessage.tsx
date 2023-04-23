import { useCallback } from 'react';
import { CommonAction } from 'reducer/common/CommonReducers';
import { useAppDispatch } from 'store/store';

export const useMessage = () => {
  const dispatch = useAppDispatch();

  const setMessage = useCallback(
    (message: string, type: 'success' | 'error' = 'error') => {
      dispatch(CommonAction.setMessage({ message, type }));
    },
    [dispatch],
  );

  const setMessageButton = useCallback(
    (url?: string, label?: string) => {
      dispatch(CommonAction.setMessageButton({ url, label }));
    },
    [dispatch],
  );

  const clearMessage = useCallback(() => {
    dispatch(CommonAction.clearMessage());
  }, [dispatch]);

  return { setMessage, setMessageButton, clearMessage };
};
