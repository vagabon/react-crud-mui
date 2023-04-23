import { useState } from 'react';

export const useThemeSelector = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleTheme = (newOpen: boolean) => () => {
    setOpen(newOpen);
    document.body.style.overflow = newOpen ? 'hidden' : '';
  };

  return { open, handleTheme };
};
