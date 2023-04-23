import { useRef } from 'react';

const useLoadState = () => {
  const firstRender = useRef(true);

  const loadIt: Function = (length: number) => (call: Function) => {
    if ((firstRender.current && length === 0) || !firstRender.current) {
      call();
    }
    firstRender.current = false;
  };

  return [loadIt];
};

export default useLoadState;
