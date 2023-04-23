import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (ref: MutableRefObject<HTMLInputElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setTimeout(() => {
          callback();
        }, 100);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
