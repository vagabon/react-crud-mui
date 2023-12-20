import { useCallback, useRef } from 'react';

const useLoadState = () => {
  const firstRender = useRef(true);

  const loadIt = useCallback(
    (length: number) => (call: () => void) => {
      if ((firstRender.current && length === 0) || !firstRender.current) {
        call();
      }
      firstRender.current = false;
    },
    [],
  );

  return { loadIt };
};

export default useLoadState;
