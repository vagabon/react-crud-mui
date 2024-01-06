import { CssBaseline, Theme, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { ITheme } from './useTheme';

interface IMdThemeProviderProps {
  theme?: ITheme;
  children: ReactNode;
}

const MdThemeProvider: React.FC<IMdThemeProviderProps> = ({ theme, children }) => {
  const [muiTheme, setMuiTheme] = useState<Theme>();

  useEffect(() => {
    if (theme) {
      setMuiTheme(createTheme(theme));
    }
  }, [theme]);

  return (
    <>
      {muiTheme && (
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      )}
    </>
  );
};

export default MdThemeProvider;
